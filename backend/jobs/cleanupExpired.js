// jobs/cleanupExpiredFiles.js
const cron = require("node-cron");
const fs = require("fs");
const { Op } = require("sequelize");
const { Files } = require("../models/File"); // adjust

function safeUnlink(p) {
  try {
    if (p && fs.existsSync(p)) fs.unlinkSync(p);
  } catch (e) {
    console.error("Failed to delete file:", p, e.message);
  }
}

function startCleanupJob() {
  // every 30 minutes
  cron.schedule("*/30 * * * *", async () => {
    try {
      const now = new Date();

      const expired = await FileShare.findAll({
        where: { expiresAt: { [Op.lte]: now } },
        limit: 200,
      });

      for (const row of expired) {
        safeUnlink(row.storedPath);
        await row.destroy();
      }

      if (expired.length) console.log("Cleanup deleted:", expired.length);
    } catch (e) {
      console.error("Cleanup job error:", e);
    }
  });
}

module.exports = { startCleanupJob };