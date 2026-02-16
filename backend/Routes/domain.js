const router = require("express").Router();
const { addDomain, listDomains, deleteDomain } = require("../controller/domain");

router.post("/", addDomain);
router.get("/", listDomains);
router.delete("/:id", deleteDomain);

module.exports = router;