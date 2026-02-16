const { genratekey, listKeys } = require("../controller/settings");
const { authentication } = require("../middleware/authentication");

const router = require("express").Router();

router.post("/genrateapikey", authentication,genratekey);
router.get("/apikeys", authentication,listKeys);
// router.get("/", listDomains);
// router.delete("/:id", deleteDomain);

module.exports = router;