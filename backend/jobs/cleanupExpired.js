// jobs/fileCleanup.js
const fs = require("fs");
const { Op } = require("sequelize");
const Files = require("../models/File");

async function cleanupExpiredFiles() {
  const now = new Date();

  const expired = await Files.findAll({
    where: { expiresAt: { [Op.lte]: now } },
    limit: 1000,
  });

  for (const row of expired) {
    if (row.storedPath) {
      try { fs.unlinkSync(row.storedPath); } catch {}
    }
    try { await row.destroy(); } catch {}
  }

  return expired.length;
}

module.exports = { cleanupExpiredFiles };