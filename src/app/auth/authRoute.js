const router = require("express").Router();
const isLoggedIn = require("../../middlewares/isLogin");
const { isLoggedOut } = require("../../middlewares/isLogout");
const { login, logout } = require("./authController");

router.post("/login",isLoggedOut, login); 
router.post("/logout",isLoggedIn, logout); 

module.exports = router;
