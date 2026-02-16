const router = require("express").Router();
const { createLink, listLinks, toggleLink, deleteLink, developerCreate } = require("../controller/link");
const { devAuth } = require("../middleware/authentication");


// public/basic apis
router.post("/", createLink);
router.get("/", listLinks);
router.patch("/:id/toggle", toggleLink);
router.delete("/:id", deleteLink);
// dev api
router.post("/create", devAuth,developerCreate);

module.exports = router;