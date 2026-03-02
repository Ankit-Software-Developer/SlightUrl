const Click = require("../models/Click");
const Link = require("../models/Link");
const { Op, fn, col, literal } = require("sequelize");
const ExcelJS = require("exceljs");

/** parse days=30 (default) or from/to ISO */
function getRange(req) {
  const days = Math.max(1, parseInt(req.query.days || "30", 10));
  const to = req.query.to ? new Date(req.query.to) : new Date();

  let from;
  if (req.query.from) {
    from = new Date(req.query.from);
  } else {
    from = new Date(to);
    from.setDate(from.getDate() - days + 1);
    from.setHours(0, 0, 0, 0);
  }

  // safety
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
    return null;
  }

  return { from, to, days };
}

/** Build analytics report once, used by /report and /export */
async function buildReportForUser(userId, range) {
  // link ids for user
  const linkRows = await Link.findAll({
    where: { userId },
    attributes: ["id"],
    raw: true,
  });

  const linkIds = linkRows.map((r) => r.id);

  if (!linkIds.length) {
    return {
      range: {
        from: range.from.toISOString(),
        to: range.to.toISOString(),
        days: range.days,
      },
      totalClicks: 0,
      series: [],
      topReferrers: [],
      devices: [],
      topCountries: [],
    };
  }

  // common where for Click
  const clickWhere = {
    linkId: { [Op.in]: linkIds },
    created_at: { [Op.between]: [range.from, range.to] }, // ✅ uses real column name
  };

  const totalClicks = await Click.count({ where: clickWhere });

  // -------- Daily series (clicks/day) --------
  const dateExpr = fn("DATE", col("created_at"));
  const seriesRows = await Click.findAll({
    where: clickWhere,
    attributes: [
      [dateExpr, "date"],
      [fn("COUNT", col("id")), "clicks"],
    ],
    group: [dateExpr],
    order: [[dateExpr, "ASC"]],
    raw: true,
  });

  // Fill missing days (nice chart)
  const dayMap = new Map(
    seriesRows.map((r) => [String(r.date), Number(r.clicks || 0)]),
  );

  const series = [];
  const cursor = new Date(range.from);
  cursor.setHours(0, 0, 0, 0);

  const end = new Date(range.to);
  end.setHours(0, 0, 0, 0);

  while (cursor <= end) {
    const key = cursor.toISOString().slice(0, 10); // yyyy-mm-dd
    series.push({ date: key, clicks: dayMap.get(key) || 0 });
    cursor.setDate(cursor.getDate() + 1);
  }

  // -------- Top Referrers (domain-level) --------
  // referer -> host, else Direct
  const refExpr = literal(`
    CASE
      WHEN referer IS NULL OR referer = '' THEN 'Direct'
      ELSE REPLACE(REPLACE(SUBSTRING_INDEX(referer,'/',3),'https://',''),'http://','')
    END
  `);

  const refRows = await Click.findAll({
    where: clickWhere,
    attributes: [
      [refExpr, "source"],
      [fn("COUNT", col("id")), "clicks"],
    ],
    group: [refExpr],
    order: [[literal("clicks"), "DESC"]],
    limit: 5,
    raw: true,
  });

  // -------- Devices --------
  const devExpr = literal(`
    CASE
      WHEN device IS NULL OR device = '' THEN 'Unknown'
      ELSE device
    END
  `);

  const deviceRows = await Click.findAll({
    where: clickWhere,
    attributes: [
      [devExpr, "device"],
      [fn("COUNT", col("id")), "clicks"],
    ],
    group: [devExpr],
    order: [[literal("clicks"), "DESC"]],
    raw: true,
  });

  // -------- Countries --------
  const cExpr = literal(`
    CASE
      WHEN country IS NULL OR country = '' THEN 'Unknown'
      ELSE country
    END
  `);

  const countryRows = await Click.findAll({
    where: clickWhere,
    attributes: [
      [cExpr, "country"],
      [fn("COUNT", col("id")), "clicks"],
    ],
    group: [cExpr],
    order: [[literal("clicks"), "DESC"]],
    limit: 8,
    raw: true,
  });

  // attach percentage
  const pct = (x) =>
    totalClicks ? Number(((x / totalClicks) * 100).toFixed(1)) : 0;

  const topReferrers = refRows.map((r) => ({
    source: r.source,
    clicks: Number(r.clicks || 0),
    percentage: pct(Number(r.clicks || 0)),
  }));

  const devices = deviceRows.map((r) => ({
    device: r.device,
    clicks: Number(r.clicks || 0),
    percentage: pct(Number(r.clicks || 0)),
  }));

  const topCountries = countryRows.map((r) => ({
    country: r.country,
    clicks: Number(r.clicks || 0),
    percentage: pct(Number(r.clicks || 0)),
  }));

  return {
    range: {
      from: range.from.toISOString(),
      to: range.to.toISOString(),
      days: range.days,
    },
    totalClicks,
    series,
    topReferrers,
    devices,
    topCountries,
  };
}

// ✅ existing summary (keep yours unchanged)
const summary = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const linkRows = await Link.findAll({
      where: { userId },
      attributes: ["id"],
      raw: true,
    });

    const linkIds = linkRows.map((r) => r.id);

    const [totalLinks, activeLinks, totalClicks] = await Promise.all([
      Link.count({ where: { userId } }),
      Link.count({ where: { userId, isActive: true } }),
      Link.sum("clicks", { where: { userId } }),
    ]);

    const todayClicks = linkIds.length
      ? await Click.count({
          where: {
            linkId: { [Op.in]: linkIds },
            created_at: { [Op.gte]: startOfToday },
          },
        })
      : 0;

    const recentLinks = await Link.findAll({
      where: { userId },
      order: [["created_at", "DESC"]],
      limit: 3,
      raw: true,
    });

    const mappedRecent = recentLinks.map((l) => ({
      id: l.id,
      code: l.code,
      alais: l.alais,
      longUrl: l.longUrl,
      domain: l.domain,
      isActive: l.isActive,
      clicks: l.clicks || 0,
      createdAt: l.created_at,
      shortUrl: `https://${l.domain || "slighturl.com"}/${l.alais || l.code}`,
    }));

    return res.json({
      totalClicks: totalClicks || 0,
      todayClicks,
      totalLinks,
      activeLinks,
      recentLinks: mappedRecent,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to load analytics summary" });
  }
};

// ✅ new report for analytics page
const anylictsreport = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const range = getRange(req);
    if (!range) return res.status(400).json({ message: "Invalid range" });

    const data = await buildReportForUser(userId, range);
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to load analytics report" });
  }
};

function fmtDateDMY(dateStrOrDate) {
  const d = new Date(dateStrOrDate);
  if (Number.isNaN(d.getTime())) return "";
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function fmtDateTimeDMYHM(dateStrOrDate) {
  const d = new Date(dateStrOrDate);
  if (Number.isNaN(d.getTime())) return "";
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function csvEscape(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  return `"${s.replace(/"/g, '""')}"`;
}

function csvRow(arr) {
  return arr.map(csvEscape).join(",");
}

function getRanges(req) {
  const days = Math.max(1, parseInt(req.query.days || "30", 10));
  const to = req.query.to ? new Date(req.query.to) : new Date();
  to.setHours(23, 59, 59, 999);

  let from;
  if (req.query.from) {
    from = new Date(req.query.from);
    from.setHours(0, 0, 0, 0);
  } else {
    from = new Date(to);
    from.setDate(from.getDate() - (days - 1));
    from.setHours(0, 0, 0, 0);
  }

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return null;
  return { from, to, days };
}

const pad2 = (n) => String(n).padStart(2, "0");
function fmtDateTimeDMYHM(v) {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "";
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()} ${pad2(
    d.getHours()
  )}:${pad2(d.getMinutes())}`;
}

function buildShortUrl(link) {
  const domain = link.domain || "slighturl.com";
  const codeOrAlias = link.alais || link.code || "";
  return codeOrAlias ? `https://${domain}/${codeOrAlias}` : "";
}


const exportCsv = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const range = getRanges(req);
    if (!range) return res.status(400).json({ message: "Invalid range" });

    // Links created in range
    const links = await Link.findAll({
      where: {
        userId,
        created_at: { [Op.between]: [range.from, range.to] },
      },
      attributes: [
        "id",
        "code",
        "alais",
        "longUrl",
        "domain",
        "expiresAt",
        "isActive",
        "clicks", // ✅ lifetime clicks from links table
        [col("created_at"), "created_at"],
      ],
      order: [[col("created_at"), "ASC"]],
      raw: true,
    });

    const wb = new ExcelJS.Workbook();
    wb.creator = "SlightURL";
    wb.created = new Date();

    // ---------------- Sheet 1: Links ----------------
    const wsLinks = wb.addWorksheet("Links", { views: [{ state: "frozen", ySplit: 2 }] });

    wsLinks.addRow([`Analytics Report (Links created - ${range.days} days)`]);
    wsLinks.addRow([]);

    wsLinks.addRow([
      "SrNo",
      "Link ID",
      "Short URL",
      "Long URL",
      "Domain",
      "Alias",
      "Is Active",
      "Expires At",
      "Link Created At",
      "Clicks (lifetime)",          // ✅ from Link.clicks
      `Clicks (last ${range.days} days)`, // ✅ from Click table range count
      "Last Click At",
      "Last Click IP",
      "Last Click User Agent",
      "Last Click Country",
      "Last Click Device",
      "Last Click Referer",
    ]);

    wsLinks.getRow(3).font = { bold: true };

    if (!links.length) {
      wsLinks.addRow(["", "", "No links created in this range"]);
      wsLinks.addRow([]);
      wsLinks.addRow(["From", range.from.toISOString()]);
      wsLinks.addRow(["To", range.to.toISOString()]);
      wsLinks.addRow(["Total Links Created", 0]);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="links_report_${range.days}days.xlsx"`
      );
      await wb.xlsx.write(res);
      return res.end();
    }

    const linkIds = links.map((l) => Number(l.id));

    // Clicks inside selected range (by link)
    const rangeAgg = await Click.findAll({
      where: {
        linkId: { [Op.in]: linkIds },
        created_at: { [Op.between]: [range.from, range.to] },
      },
      attributes: [[col("link_id"), "link_id"], [fn("COUNT", col("id")), "rangeClicks"]],
      group: ["link_id"],
      raw: true,
    });

    const rangeMap = new Map(
      rangeAgg.map((r) => [Number(r.link_id), Number(r.rangeClicks || 0)])
    );

    // Last click time (by link) + last click meta (ip/ua/country/device/referer)
    const lastAgg = await Click.findAll({
      where: { linkId: { [Op.in]: linkIds } },
      attributes: [[col("link_id"), "link_id"], [fn("MAX", col("created_at")), "lastClickAt"]],
      group: ["link_id"],
      raw: true,
    });

    // Fetch last-click rows (batch via OR on (linkId, created_at))
    const lastPairs = lastAgg
      .filter((r) => r.lastClickAt)
      .map((r) => ({
        linkId: Number(r.link_id),
        created_at: r.lastClickAt,
      }));

    let lastClickRows = [];
    if (lastPairs.length) {
      lastClickRows = await Click.findAll({
        where: { [Op.or]: lastPairs },
        attributes: [
          [col("link_id"), "link_id"],
          "ip",
          "userAgent", // model attr maps to user_agent column
          "referer",
          "country",
          "device",
          [col("created_at"), "created_at"],
          "id",
        ],
        raw: true,
      });
    }

    // If multiple rows match same timestamp, choose highest id
    const lastClickMap = new Map();
    for (const r of lastClickRows) {
      const lid = Number(r.link_id);
      const prev = lastClickMap.get(lid);
      if (!prev || Number(r.id) > Number(prev.id)) lastClickMap.set(lid, r);
    }

    // Fill Links sheet rows
    links.forEach((l, idx) => {
      const id = Number(l.id);

      const last = lastClickMap.get(id) || null;
      const lastClickAt = last?.created_at ? fmtDateTimeDMYHM(last.created_at) : "";

      wsLinks.addRow([
        idx + 1,
        id,
        buildShortUrl(l),
        l.longUrl || "",
        l.domain || "",
        l.alais || "",
        l.isActive ? "Active" : "Inactive",
        l.expiresAt || "",
        fmtDateTimeDMYHM(l.created_at),
        Number(l.clicks || 0),                // ✅ lifetime from links table
        rangeMap.get(id) || 0,                // ✅ range clicks from click table
        lastClickAt,
        last?.ip || "",
        last?.userAgent || "",
        last?.country || "",
        last?.device || "",
        last?.referer || "",
      ]);
    });

    wsLinks.addRow([]);
    wsLinks.addRow(["From", range.from.toISOString()]);
    wsLinks.addRow(["To", range.to.toISOString()]);
    wsLinks.addRow(["Total Links Created", links.length]);

    // Basic widths
    wsLinks.columns = wsLinks.columns.map((c) => ({ ...c, width: Math.min(60, Math.max(14, (c.header?.length || 14))) }));

    // ---------------- Sheet 2: Clicks (details) ----------------
    const wsClicks = wb.addWorksheet("Clicks", { views: [{ state: "frozen", ySplit: 1 }] });

    wsClicks.addRow([
      "SrNo",
      "Click ID",
      "Clicked At",
      "Link ID",
      "Alias",
      "Short URL",
      "Long URL",
      "IP",
      "User Agent",
      "Country",
      "Device",
      "Referer",
    ]);
    wsClicks.getRow(1).font = { bold: true };

    const linkMap = new Map(links.map((l) => [Number(l.id), l]));

    const clickRows = await Click.findAll({
      where: {
        linkId: { [Op.in]: linkIds },
        created_at: { [Op.between]: [range.from, range.to] },
      },
      attributes: [
        "id",
        [col("link_id"), "link_id"],
        "ip",
        "userAgent",
        "referer",
        "country",
        "device",
        [col("created_at"), "created_at"],
      ],
      order: [[col("created_at"), "ASC"]],
      raw: true,
    });

    clickRows.forEach((c, idx) => {
      const lid = Number(c.link_id);
      const l = linkMap.get(lid);

      wsClicks.addRow([
        idx + 1,
        c.id,
        fmtDateTimeDMYHM(c.created_at),
        lid,
        l?.alais || "",
        l ? buildShortUrl(l) : "",
        l?.longUrl || "",
        c.ip || "",
        c.userAgent || "",
        c.country || "",
        c.device || "",
        c.referer || "",
      ]);
    });

    wsClicks.columns = wsClicks.columns.map((c) => ({ ...c, width: 20 }));

    // Send file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="links_report_${range.days}days.xlsx"`
    );

    await wb.xlsx.write(res);
    return res.end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to export links report (xlsx)" });
  }
};

module.exports = { summary, anylictsreport, exportCsv };
