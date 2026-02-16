const router = require("express").Router();
const { summary } = require("../controller/analytics");

router.get("/summary", summary);

module.exports = router;