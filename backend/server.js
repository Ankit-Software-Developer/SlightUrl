const express = require("express");
const cors = require("cors");
require("dotenv").config();

const cron = require("node-cron");
const { cleanupExpiredFiles } = require("./jobs/cleanupExpired");
const sequelize = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api", require("./Routes/index"));
app.get("/health", (_, res) =>
  res.json({ ok: true, name: "slightURL API running" })
);
app.use("/", require("./Routes/redirect"));

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    await sequelize.sync({ alter: false });
    console.log("✅ Models synced");

    // Run daily at 8:00 PM Asia/Kolkata
    cron.schedule(
      "0 20 * * *",
      async () => {
        try {
          const n = await cleanupExpiredFiles();
          console.log(`[cleanup] deleted ${n} expired files`);
        } catch (e) {
          console.error("[cleanup] error", e);
        }
      },
      { timezone: "Asia/Kolkata" }
    );

    // OPTIONAL: run once on startup too (good if server restarts)
    try {
      const n = await cleanupExpiredFiles();
      console.log(`[cleanup-startup] deleted ${n} expired files`);
    } catch (e) {
      console.error("[cleanup-startup] error", e);
    }

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Startup failed:", err);
    process.exit(1);
  }
})();