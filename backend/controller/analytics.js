const Click = require("../models/Click");
const Link  = require("../models/Link");
const { Op } = require("sequelize");

const summary = async (req, res) => {
  try {
    const days = Number(req.query.days || 30);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const links = await Link.findAll({ where: { userId: req.user.id } });
    const linkIds = links.map((l) => l.id);

    const clicks = await Click.count({
      where: { linkId: { [Op.in]: linkIds }, createdAt: { [Op.gte]: since } },
    });

    const totalLinks = links.length;
    const totalClicks = links.reduce((sum, l) => sum + (l.clicks || 0), 0);

    return res.json({
      rangeDays: days,
      totalLinks,
      totalClicks,
      clicksInRange: clicks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports ={
    summary
}