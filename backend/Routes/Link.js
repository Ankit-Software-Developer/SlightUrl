const router = require("express").Router();
const { createLink, listLinks, toggleLink, deleteLink, developerCreate, usersLinks, userlinkCreate } = require("../controller/link");
const { devAuth, authentication } = require("../middleware/authentication");


// public/basic apis
router.post("/", createLink);
router.get("/", listLinks);
router.get("/user", authentication ,usersLinks);
router.patch("/:id/toggle", toggleLink);
router.delete("/:id", deleteLink);
// dev api
router.post("/create", devAuth,developerCreate);
router.post("/user/create", authentication,userlinkCreate);

module.exports = router;