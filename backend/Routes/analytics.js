const router = require("express").Router();
const { summary, anylictsreport, exportCsv } = require("../controller/analytics");
const { authentication } = require("../middleware/authentication");

router.get("/summary",authentication, summary);
router.get("/report", authentication, anylictsreport);
router.get("/export", authentication, exportCsv);


module.exports = router;