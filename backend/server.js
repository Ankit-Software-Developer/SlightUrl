const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { startCleanupJob } = require("./jobs/cleanupExpired");

const sequelize = require("./config/db");


const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api", require("./Routes/index"));
app.get("/health", (_, res) => res.json({ ok: true, name: "slightURL API running" }));
app.use("/", require("./Routes/redirect"));


const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    await sequelize.sync({ alter: false });
    console.log("✅ Models synced");

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
// startCleanupJob();
  } catch (err) {
    console.error("❌ Startup failed:", err);
    process.exit(1);
  }
})();