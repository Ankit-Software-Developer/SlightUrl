const { customAlphabet } = require("nanoid");
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

const createLink = async (req, res) => {
  try {
    const { longUrl, useralias } = req.body;
    console.log(longUrl);
    console.log(useralias);
    if (!longUrl) return res.status(400).json({ message: "longUrl required" });
    const finalLongUrl = normalizeLongUrl(longUrl);
    const alais = useralias && useralias.trim() ? useralias.trim() : null;
    console.log(alais);
    const exists = await Link.findOne({ where: { alais } });
    if (exists) {
      return res.status(409).json({ message: "Alias already taken" });
    }
    const uniqueCode = await generateUniqueCode(8);
    console.log(uniqueCode);
    const finalcode = alais ? alais : uniqueCode;
    console.log(finalcode);
    const link = await Link.create({
      userId: null, // no signup
      longUrl: finalLongUrl,
      code: uniqueCode,
      alais: finalcode,
      domain: null,
    });

    res.json({
      uniqueCode,
      shortUrl: `https://slighturl.com/${finalcode}`,
      redirectUrl: longUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
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

const developerCreate = async (req, res) => {
  try {
    const ownerUserId = req.dev.userId;
    const { longUrl, alias, expiresAt } = req.body || {};
    if (!longUrl) {
      return res.status(400).json({ message: "longUrl required" });
    }

    const finalLongUrl = normalizeLongUrl(longUrl);
    if (!finalLongUrl) {
      return res.status(400).json({ message: "Invalid longUrl" });
    }

    const useralias = normalizeAlias(alias);
    if (!useralias && alias) {
      return res.status(400).json({
        message:
          "Invalid alias. Use 4+ chars and only letters/numbers/-/_/ (slash allowed).",
      });
    }

    // Decide final code/alias
    let finalCode = useralias;
    if (finalCode) {
      const exists = await Link.findOne({ where: { alais: finalCode } });
      if (exists) {
        return res.status(409).json({
          message: "Alias already taken. Try another one.",
        });
      }
    } else {
      finalCode = await generateUniqueCode(8);
    }

    // Save (IMPORTANT: use same field for redirect lookup)
    const link = await Link.create({
      userId: ownerUserId, // ✅ owner user
      longUrl: finalLongUrl,
      code: finalCode, // keep consistent
      alais: finalCode, // if you use alais in redirect lookup
      domain: null,
      expiresAt: expiresAt,
    });

    return res.json({
      message: "Short link created",
      code: finalCode,
      shortUrl: `${process.env.PUBLIC_SHORT_DOMAIN || "https://slighturl.com"}/${finalCode}`,
      longUrl: finalLongUrl,
      linkId: link.id,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message || "Server error" });
  }
};

module.exports = {
  createLink,
  developerCreate,
  listLinks,
  toggleLink,
  deleteLink,
};
