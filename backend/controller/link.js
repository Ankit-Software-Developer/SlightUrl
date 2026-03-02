const { customAlphabet } = require("nanoid");
const dns = require("dns").promises;
const net = require("net");
const Link = require("../models/Link");

const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  8, // default length (can be changed)
);
// ensure length >= 4
async function generateUniqueCode(minLen = 8) {
  for (let i = 0; i < 20; i++) {
    const code = nanoid(Math.max(4, minLen));
    const exists = await Link.findOne({ where: { alais: code } });
    if (!exists) return code;
  }

  // fallback (very rare)
  return nanoid(minLen + 2);
}
function normalizeLongUrl(url) {
  let u = String(url || "").trim();

  if (u && !/^https?:\/\//i.test(u)) {
    u = "https://" + u;
  }

  return u;
}
function normalizeAlias(alias) {
  const a = String(alias || "").trim();
  if (!a) return null;

  // allow / in alias like: t/test-123
  // allow letters numbers dash underscore slash
  if (!/^[a-zA-Z0-9/_-]{4,150}$/.test(a)) return null;

  // avoid reserved routes
  const reserved = ["api", "health", "favicon.ico"];
  if (reserved.includes(a.split("/")[0])) return null;

  return a;
}
// -----------------------------
// Abuse Prevention / Restrictions
// -----------------------------
function isPrivateIpv4(ip) {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return false;

  const [a, b] = parts;

  return (
    a === 10 ||
    a === 127 || // loopback
    a === 0 || // "this" network
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 169 && b === 254) // link-local
  );
}
function isBlockedHostname(hostname) {
  const host = String(hostname || "").toLowerCase();

  // Optional: block other shorteners to avoid chaining abuse
  const blockedDomains = new Set([
    "tinyurl.com",
    "bit.ly",
    "t.co",
    "goo.gl",
    "is.gd",
    "cutt.ly",
    "rebrand.ly",
    "shorturl.at",
  ]);

  // exact match + subdomain match
  for (const d of blockedDomains) {
    if (host === d || host.endsWith("." + d)) return true;
  }
  return false;
}
function isDisposableHosting(hostname) {
  const host = String(hostname || "").toLowerCase();
  const suspiciousPlatforms = [
    "railway.app",
    "vercel.app",
    "netlify.app",
    "herokuapp.com",
    "onrender.com",
    "pages.dev",
    "github.io",
  ];
  return suspiciousPlatforms.some((d) => host === d || host.endsWith("." + d));
}

// Phishing keyword heuristics (soft signal)
function hasPhishyKeywords(urlObj) {
  const s = `${urlObj.hostname}${urlObj.pathname}`.toLowerCase();

  // tune this list as you see attacks in logs
  const keywords = [
    "selectthefile",
    "pleaseselect",
    "verify",
    "verification",
    "login",
    "secure",
    "update",
    "invoice",
    "payment",
    "bank",
    "onedrive",
    "microsoft",
    "office365",
    "dropbox",
    "docshare",
    "invitation",
    "officialinvitation",
    "account",
    "reset",
    "password",
  ];

  return keywords.some((k) => s.includes(k));
}

// Detect base64-encoded emails / PII in query (your DB 12–21 pattern)
function containsBase64EmailInQuery(urlObj) {
  if (!urlObj || !urlObj.searchParams || typeof urlObj.searchParams.entries !== "function") {
    return { hit: false };
  }

  for (const [k, v] of urlObj.searchParams.entries()) {
    const val = String(v || "").trim();
    if (!/^[A-Za-z0-9+/=]{16,}$/.test(val)) continue;

    try {
      const decoded = Buffer.from(val, "base64").toString("utf8");
      if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(decoded)) {
        return { hit: true, key: k, decoded };
      }
    } catch {}
  }

  return { hit: false };
}
async function basicUrlSafetyCheck(longUrl) {
  let u;
  try {
    u = new URL(longUrl);
  } catch {
    return { ok: false, reason: "Invalid URL" };
  }

  if (!["http:", "https:"].includes(u.protocol)) {
    return { ok: false, reason: "Only http/https URLs allowed" };
  }

  // Block credentials in URL (user:pass@host)
  if (u.username || u.password) {
    return { ok: false, reason: "URLs with embedded credentials are not allowed" };
  }

  const host = (u.hostname || "").toLowerCase();
  if (!host) return { ok: false, reason: "Invalid hostname" };

  if (host === "localhost") {
    return { ok: false, reason: "localhost is not allowed" };
  }

  if (isBlockedHostname(host)) {
    return { ok: false, reason: "Chained shorteners are blocked by policy" };
  }

  // If hostname is IP → block private ranges
  if (net.isIP(host)) {
    if (net.isIPv4(host) && isPrivateIpv4(host)) {
      return { ok: false, reason: "Private IP targets are not allowed" };
    }
    // If it's IPv6, consider blocking local/link-local ranges too if you want.
    return { ok: true, urlObj: u };
  }

  // DNS resolve and block domains that resolve to private IPs (SSRF defense)
  try {
    const addrs = await dns.lookup(host, { all: true });
    if (!addrs || addrs.length === 0) {
      return { ok: false, reason: "Domain could not be resolved" };
    }

    for (const a of addrs) {
      if (a.family === 4 && isPrivateIpv4(a.address)) {
        return { ok: false, reason: "Domain resolves to a private IP (blocked)" };
      }
    }
  } catch {
    return { ok: false, reason: "Domain could not be resolved" };
  }

  return { ok: true, urlObj: u };
}

/**
 * Replace this with Google Safe Browsing / your provider.
 * For now we implement heuristic policy blocks and “pending” rules.
 */
async function reputationCheckHeuristic(urlObj) {
  // 1) Privacy/rights: base64 email in query => block
  const pii = containsBase64EmailInQuery(urlObj);
  if (pii.hit) {
    return {
      verdict: "malicious",
      reason: `Privacy risk: base64-encoded email detected in query param "${pii.key}"`,
    };
  }

  // 2) Phishy keywords => suspicious (or block)
  if (hasPhishyKeywords(urlObj)) {
    return { verdict: "suspicious", reason: "Phishing-like keywords detected in URL" };
  }

  // 3) Disposable hosting for anonymous users => suspicious/pending
  // If you want to allow for logged-in users but not anonymous, keep this logic.
  if (isDisposableHosting(urlObj.hostname)) {
    return { verdict: "suspicious", reason: "Disposable hosting domain (review required)" };
  }

  return { verdict: "clean", reason: null };
}

async function enforcePolicyOrDecideStatus(finalLongUrl) {
  // 1) hard safety checks
  const basic = await basicUrlSafetyCheck(finalLongUrl);
  if (!basic.ok) {
    return { allowed: false, status: "blocked", reason: basic.reason };
  }

  // 2) threat reputation (optional but recommended)
  const rep = await reputationCheckHeuristic(basic.urlObj);

  if (rep.verdict === "malicious") {
    return { allowed: false, status: "blocked", reason: rep.reason || "Malicious / phishing" };
  }

  // suspicious → keep pending (moderation) OR block if you prefer
  if (rep.verdict === "suspicious") {
    return { allowed: true, status: "pending", reason: rep.reason || "Suspicious destination" };
  }

  return { allowed: true, status: "active", reason: null };
}

// Core creator (used by all 3)
// -----------------------------
async function createShortLink({
  ownerUserId = null,
  longUrl,
  alias,
  expiresAt,
  req,
}) {
  if (!longUrl) {
    return { error: { code: 400, message: "longUrl required" } };
  }

  const finalLongUrl = normalizeLongUrl(longUrl);
  if (!finalLongUrl) {
    return { error: { code: 400, message: "Invalid longUrl" } };
  }

  // Apply policy restrictions
  const policy = await enforcePolicyOrDecideStatus(finalLongUrl);
  if (!policy.allowed) {
    return { error: { code: 403, message: `Link rejected: ${policy.reason}` } };
  }

  // Normalize alias (same rules everywhere)
  const normalizedAlias = normalizeAlias(alias);
  if (!normalizedAlias && alias) {
    return {
      error: {
        code: 400,
        message:
          "Invalid alias. Use 4+ chars and only letters/numbers/-/_/ (slash allowed).",
      },
    };
  }

  let finalCode = normalizedAlias;
  if (finalCode) {
    const exists = await Link.findOne({ where: { alais: finalCode } });
    if (exists) {
      return { error: { code: 409, message: "Alias already taken. Try another one." } };
    }
  } else {
    finalCode = await generateUniqueCode(8);
  }

  const createdIp =
    (req && (req.headers["x-forwarded-for"] || req.ip)) || null;
  const createdUa = (req && req.headers["user-agent"]) || null;

  const link = await Link.create({
    userId: ownerUserId,
    longUrl: finalLongUrl,
    code: finalCode,
    alais: finalCode,
    domain: null,
    expiresAt: expiresAt || null,

    // Anti-abuse fields (add these columns to your Link model)
    status: policy.status, // active | pending
    blockedReason: policy.reason,
    createdIp,
    createdUa,
    lastCheckedAt: new Date(),
  });

  return {
    link,
    code: finalCode,
    status: policy.status,
    shortUrl: `${process.env.PUBLIC_SHORT_DOMAIN || "https://slighturl.com"}/${finalCode}`,
    longUrl: finalLongUrl,
  };
}


// const createLink = async (req, res) => {
//   try {
//     const { longUrl, useralias } = req.body;
//     // console.log(longUrl);
//     // console.log(useralias);
//     if (!longUrl) return res.status(400).json({ message: "longUrl required" });
//     const finalLongUrl = normalizeLongUrl(longUrl);
//     const alais = useralias && useralias.trim() ? useralias.trim() : null;
//     // console.log(alais);
//     const exists = await Link.findOne({ where: { alais } });
//     if (exists) {
//       return res.status(409).json({ message: "Alias already taken" });
//     }
//     const uniqueCode = await generateUniqueCode(8);
//     // console.log(uniqueCode);
//     const finalcode = alais ? alais : uniqueCode;
//     // console.log(finalcode);
//     const link = await Link.create({
//       userId: null, // no signup
//       longUrl: finalLongUrl,
//       code: uniqueCode,
//       alais: finalcode,
//       domain: null,
//     });

//     res.json({
//       uniqueCode,
//       shortUrl: `https://slighturl.com/${finalcode}`,
//       redirectUrl: longUrl,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: err.message || "Server error" });
//   }
// };

const createLink = async (req, res) => {
  try {
    // anonymous/no-signup link
    const { longUrl, useralias } = req.body || {};

    const result = await createShortLink({
      ownerUserId: null,
      longUrl,
      alias: useralias,
      expiresAt: null,
      req,
    });

    if (result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }

    return res.json({
      uniqueCode: result.code,
      shortUrl: result.shortUrl,
      redirectUrl: result.longUrl,
      status: result.status, // active/pending
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

const developerCreate = async (req, res) => {
  try {
    const ownerUserId = req.dev.userId;
    const { longUrl, alias, expiresAt } = req.body || {};

    const result = await createShortLink({
      ownerUserId,
      longUrl,
      alias,
      expiresAt,
      req,
    });

    if (result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }

    return res.json({
      message: "Short link created",
      code: result.code,
      shortUrl: result.shortUrl,
      longUrl: result.longUrl,
      status: result.status,
      linkId: result.link.id,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message || "Server error" });
  }
};

const userlinkCreate = async (req, res) => {
  try {
    const ownerUserId = req.user.id;
    const { longUrl, alias, expiresAt } = req.body || {};

    const result = await createShortLink({
      ownerUserId,
      longUrl,
      alias,
      expiresAt,
      req,
    });

    if (result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }

    return res.json({
      message: "Short link created",
      code: result.code,
      shortUrl: result.shortUrl,
      longUrl: result.longUrl,
      status: result.status,
      linkId: result.link.id,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message || "Server error" });
  }
};
const listLinks = async (req, res) => {
  try {
    const links = await Link.findAll({
      where: { userId: req.user.id },
      order: [["id", "DESC"]],
    });
    return res.json({ links });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
const usersLinks = async (req, res) => {
  try {
    // console.log(req.user)
    const userId = req.user.id
    // console.log(userId)
    const links = await Link.findAll({
      where: { userId: req.user.id },
      order: [["id", "DESC"]],
    });
    // console.log(links)
    return res.json({ links });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const toggleLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await Link.findOne({ where: { id, userId: req.user.id } });
    if (!link) return res.status(404).json({ message: "Not found" });

    link.isActive = !link.isActive;
    await link.save();

    return res.json({ link });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await Link.findOne({ where: { id, userId: req.user.id } });
    if (!link) return res.status(404).json({ message: "Not found" });

    await link.destroy();
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// const developerCreate = async (req, res) => {
//   try {
//     const ownerUserId = req.dev.userId;
//     const { longUrl, alias, expiresAt } = req.body || {};
//     if (!longUrl) {
//       return res.status(400).json({ message: "longUrl required" });
//     }

//     const finalLongUrl = normalizeLongUrl(longUrl);
//     if (!finalLongUrl) {
//       return res.status(400).json({ message: "Invalid longUrl" });
//     }

//     const useralias = normalizeAlias(alias);
//     if (!useralias && alias) {
//       return res.status(400).json({
//         message:
//           "Invalid alias. Use 4+ chars and only letters/numbers/-/_/ (slash allowed).",
//       });
//     }

//     // Decide final code/alias
//     let finalCode = useralias;
//     if (finalCode) {
//       const exists = await Link.findOne({ where: { alais: finalCode } });
//       if (exists) {
//         return res.status(409).json({
//           message: "Alias already taken. Try another one.",
//         });
//       }
//     } else {
//       finalCode = await generateUniqueCode(8);
//     }

//     // Save (IMPORTANT: use same field for redirect lookup)
//     const link = await Link.create({
//       userId: ownerUserId, // ✅ owner user
//       longUrl: finalLongUrl,
//       code: finalCode, // keep consistent
//       alais: finalCode, // if you use alais in redirect lookup
//       domain: null,
//       expiresAt: expiresAt,
//     });

//     return res.json({
//       message: "Short link created",
//       code: finalCode,
//       shortUrl: `${process.env.PUBLIC_SHORT_DOMAIN || "https://slighturl.com"}/${finalCode}`,
//       longUrl: finalLongUrl,
//       linkId: link.id,
//     });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ message: e.message || "Server error" });
//   }
// };
// const userlinkCreate = async (req, res) => {
//   try {
//     const ownerUserId = req.user.id;
//     const { longUrl, alias, expiresAt } = req.body || {};
//     if (!longUrl) {
//       return res.status(400).json({ message: "longUrl required" });
//     }

//     const finalLongUrl = normalizeLongUrl(longUrl);
//     if (!finalLongUrl) {
//       return res.status(400).json({ message: "Invalid longUrl" });
//     }

//     const useralias = normalizeAlias(alias);
//     if (!useralias && alias) {
//       return res.status(400).json({
//         message:
//           "Invalid alias. Use 4+ chars and only letters/numbers/-/_/ (slash allowed).",
//       });
//     }

//     // Decide final code/alias
//     let finalCode = useralias;
//     if (finalCode) {
//       const exists = await Link.findOne({ where: { alais: finalCode } });
//       if (exists) {
//         return res.status(409).json({
//           message: "Alias already taken. Try another one.",
//         });
//       }
//     } else {
//       finalCode = await generateUniqueCode(8);
//     }

//     // Save (IMPORTANT: use same field for redirect lookup)
//     const link = await Link.create({
//       userId: ownerUserId, // ✅ owner user
//       longUrl: finalLongUrl,
//       code: finalCode, // keep consistent
//       alais: finalCode, // if you use alais in redirect lookup
//       domain: null,
//       expiresAt: expiresAt,
//     });

//     return res.json({
//       message: "Short link created",
//       code: finalCode,
//       shortUrl: `${process.env.PUBLIC_SHORT_DOMAIN || "https://slighturl.com"}/${finalCode}`,
//       longUrl: finalLongUrl,
//       linkId: link.id,
//     });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({ message: e.message || "Server error" });
//   }
// };

module.exports = {
  createLink,
  developerCreate,
  userlinkCreate,
  listLinks,
  usersLinks,
  toggleLink,
  deleteLink,
};
