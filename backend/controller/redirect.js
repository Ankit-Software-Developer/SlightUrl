const Click = require("../models/Click");
const Link = require("../models/Link");

const redirect = async (req, res) => {
  try {
    // Only handle GET
    // if (req.method !== "GET") return res.status(405).send("Method not allowed");
    if (req.method !== "GET" && req.method !== "HEAD") {
      return res.status(405).send("Method not allowed");
    }
    // FULL path after domain (no query)
    // ex: "/t/test-123?x=1" -> "/t/test-123"
    const rawPath = (req.originalUrl || req.url || "")
    // .split("?")[0];
    // console.log(rawPath)
    // if (req.path === "/favicon.ico") return res.sendStatus(204);

    //     // "/t/test-123?x=1" → "/t/test-123"
    //     const rawPath = req.path;

    // remove leading "/"
    const code = decodeURIComponent(rawPath.replace(/^\/+/, ""));

    // avoid catching your API routes
    if (!code || code === "favicon.ico")
      return res.status(404).send("Not found");
    if (code.startsWith("api/")) return res.status(404).send("Not found");

    const link = await Link.findOne({ where: { alais: code } });
    if (!link) return res.status(404).send("Link not found");
    if (link.isActive === false)
      return res.status(410).send("Link is disabled");

    // Track click
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      null;

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
    let dest = (link.longUrl || "").trim();
    if (dest && !/^https?:\/\//i.test(dest)) {
      dest = "https://" + dest;
    }
    return res.redirect(link.longUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

module.exports = { redirect };
