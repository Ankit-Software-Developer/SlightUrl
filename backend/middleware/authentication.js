const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ApiKey = require("../models/APIkey");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

function sha256(s) {
  return crypto.createHash("sha256").update(String(s)).digest("hex");
}

const authentication = async (req, res, next) => {
  try {
    const hdr = req.headers.authorization || "";
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Missing token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id, {
      attributes: ["id", "name", "email", "plan"],
    });

    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const devAuth = async (req, res, next) => {
  try {
    const apiKey = req.headers.authorization || "";
    if (!apiKey) return res.status(401).json({ message: "Missing x-api-key" });

    const row = await ApiKey.findOne({
      where: { keyHash: apiKey, isActive: true },
    });
    if (!row) return res.status(401).json({ message: "Invalid API key" });
    const isValid = await bcrypt.compare(row.keyverify, apiKey);
    if (!isValid) return res.status(401).json({ message: "Invalid API key" });
    // attach developer context
    req.dev = {
      userId: row.userId,
      apiKeyId: row.id,
    };

    return next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Auth error" });
  }
};

module.exports = {
  authentication,
  devAuth,
};
