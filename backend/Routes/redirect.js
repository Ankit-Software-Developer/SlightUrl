const router = require("express").Router();
const { redirect } = require("../controller/redirect");

// router.get("/:code(.*)", redirect);
router.use(redirect);

module.exports = router;