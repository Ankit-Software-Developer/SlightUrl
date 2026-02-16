const crypto = require("crypto");
const bcrypt = require("bcrypt");
const ApiKey = require("../models/APIkey");
const { where } = require("sequelize");

function makeApiKey(prefix = "sk") {
  // example: sk_live_xxxxx (work like Stripe style)
  const raw = crypto.randomBytes(32).toString("base64url"); // url-safe
  return `${prefix}_${raw}`;
}

async function rotateDailyCounterIfNeeded(row) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  if (row.dailyUsedAt !== today) {
    row.dailyUsedAt = today;
    row.dailyUsed = 0;
    await row.save();
  }
}

const genratekey = async (req, res) => {
  try {
    // must be logged in (authentication middleware should set req.user)
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { name, dailyLimit } = req.body || {};

    // (optional) validate dailyLimit
    // let limit = null;
    let limit = 2000;
    // if (dailyLimit !== undefined && dailyLimit !== null && dailyLimit !== "") {
    //   const n = Number(dailyLimit);
    //   if (!Number.isInteger(n) || n < 1) {
    //     return res.status(400).json({ message: "dailyLimit must be a positive integer" });
    //   }
    //   limit = n;
    // }

    // generate raw key (show only once)
    const rawKey = makeApiKey("sk");

    // hash it for storage
    const keyHash = await bcrypt.hash(rawKey, 10);
    let row = null;
    // save in DB
    const existing = await ApiKey.findOne({ where: { userId } });
    if (existing) {
      row = await existing.update({
        name: name ? String(name).trim().slice(0, 80) : null,
        keyverify: rawKey,
        keyHash,
        isActive: true,
        dailyLimit: limit, // null = unlimited
        dailyUsed: 0,
        dailyUsedAt: new Date().toISOString().slice(0, 10),
      });
    } else {
      row = await ApiKey.create({
        userId,
        name: name ? String(name).trim().slice(0, 80) : null,
        keyverify: rawKey,
        keyHash,
        isActive: true,
        dailyLimit: limit, // null = unlimited
        dailyUsed: 0,
        dailyUsedAt: new Date().toISOString().slice(0, 10),
      });
    }
    // return RAW only once
    return res.json({
      message: "API key generated (copy it now, it won’t be shown again).",
      apiKey: keyHash,
      keyId: row.id,
      name: row.name,
      createdAt: row.created_at || row.createdAt,
      dailyLimit: row.dailyLimit,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

const listKeys = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const keys = await ApiKey.findAll({
      where: { userId },
      order: [["id", "DESC"]],
      attributes: [
        "id",
        "name",
        "keyHash",
        "isActive",
        "dailyLimit",
        "dailyUsed",
        "dailyUsedAt",
        "created_at",
        "updated_at",
      ],
    });

    return res.json({ keys });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

const revokeKey = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;

    const row = await ApiKey.findOne({ where: { id, userId } });
    if (!row) return res.status(404).json({ message: "Key not found" });

    row.isActive = false;
    await row.save();

    return res.json({ message: "API key revoked", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

module.exports = { genratekey, listKeys, revokeKey };
