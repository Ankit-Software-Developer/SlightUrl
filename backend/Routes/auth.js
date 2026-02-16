const router = require("express").Router();
const {
  register,
  login,
  me,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controller/auth");
const { authentication } = require("../middleware/authentication");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authentication, me);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", authentication, changePassword);

module.exports = router;
