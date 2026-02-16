const router = require("express").Router();
const { upload } = require("../config/upload");
const { uploadfile, getfile, downloadfile } = require("../controller/fileController");
const { devAuth } = require("../middleware/authentication");


// public/basic apis
router.post("/upload",upload.single("file"), uploadfile);
router.get("/:code/meta", getfile);
router.get("/:code/download", downloadfile);

module.exports = router;