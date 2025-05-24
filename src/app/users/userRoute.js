const isLoggedIn = require("../../middlewares/isLogin")
const { register,getUserProfile,updatePasswordById,forgetPassword,resetPassword,getUserAppointment } = require("./userController")

const router = require("express").Router()

router.post("/signup",register)
router.get("/profile",isLoggedIn,getUserProfile)
router.get("/appointment",isLoggedIn,getUserAppointment)
router.put("/update-password",isLoggedIn,updatePasswordById)
router.post("/forgot-password",forgetPassword)
router.put("/reset-password",resetPassword)


module.exports = router
