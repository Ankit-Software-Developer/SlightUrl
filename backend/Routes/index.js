const express = require("express");
const auth = require("../Routes/auth");
const link = require("../Routes/Link");
const analytics = require("../Routes/analytics");
const domain = require("../Routes/domain");
const settings = require("../Routes/settings");
const filesRoute = require("../Routes/files");
const router = express.Router();

router.use("/auth", auth);
router.use("/links", link);
router.use("/analytics", analytics);
router.use("/domains", domain);
router.use("/setting", settings);
router.use("/files", filesRoute);

module.exports = router;
