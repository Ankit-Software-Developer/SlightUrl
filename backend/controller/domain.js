const Domain = require("../models/Domain");

const addDomain = async (req, res) => {
  try {
    const { host } = req.body;
    if (!host) return res.status(400).json({ message: "host required" });

    const domain = await Domain.create({
      userId: req.user.id,
      host: host.trim().toLowerCase(),
      isVerified: false,
    });

    return res.json({ domain });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const listDomains = async (req, res) => {
  try {
    const domains = await Domain.findAll({
      where: { userId: req.user.id },
      order: [["id", "DESC"]],
    });
    return res.json({ domains });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteDomain = async (req, res) => {
  try {
    const { id } = req.params;
    const domain = await Domain.findOne({ where: { id, userId: req.user.id } });
    if (!domain) return res.status(404).json({ message: "Not found" });
    await domain.destroy();
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addDomain,
  listDomains,
  deleteDomain,
};
