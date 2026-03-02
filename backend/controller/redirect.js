// const Click = require("../models/Click");
// const Link = require("../models/Link");

// const redirect = async (req, res) => {
//   try {
//     // Only handle GET
//     // if (req.method !== "GET") return res.status(405).send("Method not allowed");
//     if (req.method !== "GET" && req.method !== "HEAD") {
//       return res.status(405).send("Method not allowed");
//     }
//     // FULL path after domain (no query)
//     // ex: "/t/test-123?x=1" -> "/t/test-123"
//     const rawPath = (req.originalUrl || req.url || "")
//     // .split("?")[0];
//     // console.log(rawPath)
//     // if (req.path === "/favicon.ico") return res.sendStatus(204);

//     //     // "/t/test-123?x=1" → "/t/test-123"
//     //     const rawPath = req.path;

//     // remove leading "/"
//     const code = decodeURIComponent(rawPath.replace(/^\/+/, ""));

//     // avoid catching your API routes
//     if (!code || code === "favicon.ico")
//       return res.status(404).send("Not found");
//     if (code.startsWith("api/")) return res.status(404).send("Not found");

//     const link = await Link.findOne({ where: { alais: code } });
//     if (!link) return res.status(404).send("Link not found");
//     if (link.isActive === false)
//       return res.status(410).send("Link is disabled");

//     // Track click
//     const ip =
//       req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
//       req.socket.remoteAddress ||
//       null;

//     await Click.create({
//       linkId: link.id,
//       ip,
//       userAgent: req.headers["user-agent"] || null,
//       referer: req.headers["referer"] || null,
//       country: null,
//       device: null,
//     });

//     link.clicks = (link.clicks || 0) + 1;
//     await link.save();
//     let dest = (link.longUrl || "").trim();
//     if (dest && !/^https?:\/\//i.test(dest)) {
//       dest = "https://" + dest;
//     }
//     return res.redirect(link.longUrl);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send("Server error");
//   }
// };

// module.exports = { redirect };

const Click = require("../models/Click");
const Link = require("../models/Link");

/** Simple HTML escape */
function esc(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** A nice server-side HTML page (with "ad" slots placeholders) */
function renderStatusPage({
  title,
  subtitle,
  statusCode = 404,
  code = "",
  primaryCtaHref = "/",
  primaryCtaText = "Go to homepage",
  showReport = true,
}) {
  const safeCode = esc(code);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)}</title>
  <style>
    :root{
      --bg:#f6f8ff;
      --card:#ffffff;
      --border:#e6e9f6;
      --text:#111827;
      --muted:#6b7280;
      --muted2:#8b93a7;
      --shadow: 0 18px 60px rgba(17,24,39,.08);

      --p1:#2563eb; /* blue */
      --p2:#7c3aed; /* purple */
      --p3:#a855f7; /* violet */
      --g1: linear-gradient(90deg, var(--p1), var(--p2), var(--p3));
      --soft: rgba(124,58,237,.10);
      --soft2: rgba(37,99,235,.10);
      --danger:#ef4444;
      --warning:#f59e0b;
      --success:#22c55e;
    }

    *{box-sizing:border-box}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
      color:var(--text);
      background:
        radial-gradient(1200px 500px at 15% 10%, rgba(124,58,237,.14), transparent 55%),
        radial-gradient(900px 420px at 85% 15%, rgba(37,99,235,.12), transparent 55%),
        linear-gradient(180deg, #ffffff, var(--bg));
      min-height:100vh;
    }

    /* top nav like your site */
    .nav{
      height:64px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 20px;
      background: rgba(255,255,255,.85);
      backdrop-filter: blur(10px);
      border-bottom:1px solid rgba(230,233,246,.9);
      position:sticky;
      top:0;
      z-index:10;
    }
    .brand{
      display:flex;
      align-items:center;
      gap:10px;
      font-weight:800;
      color:#2a2f44;
    }
    .logo{
      width:38px;height:38px;border-radius:12px;
      background: var(--g1);
      box-shadow: 0 14px 30px rgba(124,58,237,.18);
      display:grid;place-items:center;
      color:white;
      font-weight:900;
      font-size:18px;
    }
    .navlinks{
      display:flex; gap:22px;
      color:#475569;
      font-weight:600;
    }
    .navlinks a{
      color:inherit;
      text-decoration:none;
    }
    .navright{
      display:flex; align-items:center; gap:12px;
    }
    .pill{
      font-size:12px;
      padding:6px 10px;
      border-radius:999px;
      border:1px solid var(--border);
      background: #fff;
      color:#5b647a;
    }
    .btnNav{
      border:none;
      border-radius:12px;
      padding:10px 14px;
      font-weight:800;
      color:white;
      background: var(--g1);
      box-shadow: 0 12px 26px rgba(124,58,237,.16);
      text-decoration:none;
      display:inline-flex;
      align-items:center;
      gap:8px;
      white-space:nowrap;
    }
    .btnNav.secondary{
      background:#fff;
      color:#334155;
      border:1px solid var(--border);
      box-shadow:none;
      font-weight:700;
    }

    /* layout */
    .wrap{
      width:min(1180px, 100%);
      margin:0 auto;
      padding:26px 14px 28px;
    }
    .layout{
      display:grid;
      grid-template-columns: 290px 1fr 290px;
      gap:18px;
      align-items:start;
    }
    @media (max-width: 1020px){
      .layout{
        grid-template-columns: 1fr;
      }
      .adcol{order:2}
      .maincol{order:1}
    }

    /* Ad cards */
    .adcol{display:flex; flex-direction:column; gap:16px;}
    .adcard{
      background: rgba(255,255,255,.92);
      border:1px solid var(--border);
      border-radius:18px;
      box-shadow: 0 12px 40px rgba(17,24,39,.06);
      overflow:hidden;
    }
    .adhead{
      padding:12px 14px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      border-bottom:1px solid rgba(230,233,246,.9);
      background:
        linear-gradient(180deg, rgba(124,58,237,.08), rgba(37,99,235,.05));
      font-weight:800;
      color:#2a2f44;
      font-size:13px;
    }
    .adhead span{
      font-weight:700;
      font-size:12px;
      color: var(--muted2);
    }
    .adbox{
      height:240px;
      display:grid;
      place-items:center;
      margin:14px;
      border-radius:16px;
      border:1px dashed rgba(124,58,237,.35);
      background:
        radial-gradient(800px 260px at 50% 0%, rgba(124,58,237,.10), transparent 60%),
        radial-gradient(700px 260px at 50% 100%, rgba(37,99,235,.08), transparent 60%),
        #fff;
      color:#6b7280;
      font-size:12px;
      text-align:center;
      padding:10px;
    }
    .adfoot{
      padding:0 14px 14px;
      color:var(--muted2);
      font-size:12px;
      line-height:1.45;
    }

    /* main status card */
    .card{
      background: rgba(255,255,255,.95);
      border:1px solid var(--border);
      border-radius:22px;
      box-shadow: var(--shadow);
      overflow:hidden;
    }
    .hero{
      padding:22px 22px 18px;
      border-bottom:1px solid rgba(230,233,246,.9);
      background:
        radial-gradient(900px 260px at 20% 0%, rgba(124,58,237,.14), transparent 60%),
        radial-gradient(900px 260px at 90% 0%, rgba(37,99,235,.12), transparent 60%),
        #fff;
    }
    .badgeRow{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      flex-wrap:wrap;
    }
    .badge{
      display:inline-flex;
      align-items:center;
      gap:8px;
      border:1px solid rgba(124,58,237,.18);
      background: rgba(124,58,237,.08);
      color:#4c1d95;
      font-weight:800;
      font-size:12px;
      border-radius:999px;
      padding:8px 12px;
      letter-spacing:.02em;
    }
    .badge .dot{
      width:9px;height:9px;border-radius:99px;
      background: var(--g1);
      box-shadow: 0 6px 14px rgba(124,58,237,.18);
    }
    .smallPill{
      font-size:12px;
      padding:7px 10px;
      border-radius:999px;
      border:1px solid var(--border);
      background: #fff;
      color:#5b647a;
    }
    h1{
      margin:12px 0 6px;
      font-size:28px;
      line-height:1.15;
      letter-spacing:-.02em;
      color:#111827;
    }
    .sub{
      margin:0;
      color:var(--muted);
      line-height:1.6;
      font-size:14.5px;
    }
    .codeBox{
      margin-top:14px;
      padding:12px 14px;
      border-radius:16px;
      border:1px dashed rgba(37,99,235,.35);
      background: rgba(37,99,235,.06);
      color:#0f172a;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size:13px;
      overflow:auto;
    }
    .actions{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      margin-top:16px;
    }
    .btn{
      appearance:none;
      border:1px solid var(--border);
      background:#fff;
      color:#334155;
      border-radius:14px;
      padding:10px 14px;
      font-weight:800;
      text-decoration:none;
      display:inline-flex;
      align-items:center;
      gap:8px;
      transition: transform .08s ease, box-shadow .12s ease, border-color .12s ease;
    }
    .btn:hover{
      transform: translateY(-1px);
      border-color: rgba(124,58,237,.25);
      box-shadow: 0 12px 22px rgba(17,24,39,.06);
    }
    .btn.primary{
      border:none;
      color:white;
      background: var(--g1);
      box-shadow: 0 16px 34px rgba(124,58,237,.18);
    }
    .btn.primary:hover{box-shadow: 0 18px 40px rgba(124,58,237,.22);}
    .btn.danger{
      border-color: rgba(239,68,68,.30);
      background: rgba(239,68,68,.06);
      color:#991b1b;
    }

    .body{
      padding:18px 22px 22px;
    }
    .info{
      display:grid;
      grid-template-columns: 1fr 1fr;
      gap:12px;
      margin-top:14px;
    }
    @media (max-width: 560px){
      .info{grid-template-columns:1fr;}
      .navlinks{display:none;}
    }
    .ibox{
      border:1px solid var(--border);
      background: #fff;
      border-radius:16px;
      padding:12px 12px;
      color:var(--muted);
      font-size:12.5px;
      line-height:1.55;
    }
    .ibox b{color:#2a2f44}

    footer{
      margin-top:14px;
      color: rgba(107,114,128,.9);
      font-size:12px;
      display:flex;
      justify-content:space-between;
      gap:12px;
      flex-wrap:wrap;
      padding:0 4px;
    }
    .link{
      color:#4f46e5;
      text-decoration:none;
      border-bottom:1px dashed rgba(79,70,229,.3);
    }
    .link:hover{border-bottom-color: rgba(79,70,229,.65);}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="layout">
      <!-- LEFT ADS -->
      <aside class="adcol">
        <div class="adcard">
          <div class="adhead">Sponsored <span>Ad slot 300×250</span></div>
          <div class="adbox">Place AdSense / banner here</div>
          <div class="adfoot">Keep ads compliant. No deceptive redirects.</div>
        </div>
        <div class="adcard">
          <div class="adhead">Recommended <span>Promo</span></div>
          <div class="adbox">Partner promotion placeholder</div>
          <div class="adfoot">You can show your own products here.</div>
        </div>
      </aside>

      <!-- CENTER STATUS -->
      <main class="maincol">
        <div class="card">
          <div class="hero">
            <div class="badgeRow">
              <div class="badge"><span class="dot"></span> Link status</div>
              <div class="smallPill">Error ${statusCode}</div>
            </div>

            <h1>${esc(title)}</h1>
            <p class="sub">${esc(subtitle)}</p>

            ${safeCode ? `<div class="codeBox">https://slighturl.com/${safeCode}</div>` : ""}

            <div class="actions">
              <a class="btn primary" href="https://slighturl.com">✨ ${esc(primaryCtaText)}</a>
              <a class="btn" href="https://slighturl.com/">🔎 Create a new short link</a>
              </div>
          </div>

          <div class="body">
            <div class="info">
              <div class="ibox"><b>Why am I seeing this?</b><br/>The link may be removed, expired, disabled by the owner, or blocked by policy.</div>
              <div class="ibox"><b>Safety</b><br/>We block phishing, malware, scams, privacy violations, spam, and internal/private network redirects.</div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="adcard">
          <div class="adbox">Partner promotion placeholder</div>
        </div>
      </main>

      <!-- RIGHT ADS -->
      <aside class="adcol">
        <div class="adcard">
          <div class="adhead">Sponsored <span>Ad slot 300×250</span></div>
          <div class="adbox">Place AdSense / banner here</div>
          <div class="adfoot">Try a clean, trusted brand banner.</div>
        </div>
        <div class="adcard">
          <div class="adhead">Tools <span>Recommended</span></div>
          <div class="adbox">Analytics / premium plan promo</div>
          <div class="adfoot">Upgrade prompts work well here.</div>
        </div>
      </aside>
    </div>

    <footer>
      <div>© ${new Date().getFullYear()} SlightURL</div>
      <div>
        <a class="link" href="/terms">Terms</a> •
        <a class="link" href="/privacy">Privacy</a> •
        <a class="link" href="/report">Report abuse</a>
      </div>
    </footer>
  </div>
</body>
</html>`;
}

function sendStatusPage(req, res, statusCode, payload) {
  // For HEAD requests, do not send body
  if (req.method === "HEAD") return res.sendStatus(statusCode);
  return res
    .status(statusCode)
    .send(renderStatusPage({ statusCode, ...payload }));
}

const redirect = async (req, res) => {
  try {
    if (req.method !== "GET" && req.method !== "HEAD") {
      return sendStatusPage(req, res, 405, {
        title: "Method not allowed",
        subtitle: "This endpoint supports only GET/HEAD requests.",
        code: "",
        primaryCtaHref: "/",
        primaryCtaText: "Go to homepage",
        showReport: false,
      });
    }

    const rawPath = req.originalUrl || req.url || "";
    const code = decodeURIComponent(rawPath.replace(/^\/+/, ""));

    if (!code || code === "favicon.ico" || code.startsWith("api/")) {
      return sendStatusPage(req, res, 404, {
        title: "Link not found",
        subtitle: "This short link doesn’t exist or the route is invalid.",
        code,
      });
    }

    const link = await Link.findOne({ where: { alais: code } });
    if (!link) {
      return sendStatusPage(req, res, 404, {
        title: "Link not found",
        subtitle: "This short link doesn’t exist or has been removed.",
        code,
      });
    }

    // ✅ Enforce policy states (new fields)
    if (link.status && link.status !== "active") {
      const title =
        link.status === "pending"
          ? "Link is under review"
          : link.status === "blocked"
            ? "Link blocked for safety"
            : "Link disabled";

      const subtitle =
        link.status === "pending"
          ? "This link is temporarily unavailable while we review it for safety."
          : link.blockedReason
            ? link.blockedReason
            : "This link is unavailable due to policy or moderation.";

      return sendStatusPage(req, res, 423, { title, subtitle, code });
    }

    if (link.isActive === false) {
      return sendStatusPage(req, res, 410, {
        title: "Link disabled",
        subtitle: "The owner has disabled this short link.",
        code,
      });
    }

    // Optional: expire handling (if expiresAt is ISO string)
    if (link.expiresAt) {
      const exp = new Date(link.expiresAt);
      if (!Number.isNaN(exp.getTime()) && exp.getTime() < Date.now()) {
        return sendStatusPage(req, res, 410, {
          title: "Link expired",
          subtitle: "This short link has expired.",
          code,
        });
      }
    }

    // Track click
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      null;

    // Skip click insert for HEAD
    if (req.method !== "HEAD") {
      await Click.create({
        linkId: link.id,
        ip,
        userAgent: req.headers["user-agent"] || null,
        referer: req.headers["referer"] || null,
        country: null,
        device: null,
      });

      link.clicks = (link.clicks || 0) + 1;
      await link.save();
    }

    // Normalize destination
    let dest = (link.longUrl || "").trim();
    if (dest && !/^https?:\/\//i.test(dest)) dest = "https://" + dest;

    // ✅ redirect using normalized dest
    return res.redirect(dest);
  } catch (err) {
    console.error(err);
    return sendStatusPage(req, res, 500, {
      title: "Server error",
      subtitle:
        "Something went wrong while redirecting. Please try again later.",
      code: "",
      showReport: false,
    });
  }
};

module.exports = { redirect };
