const { bookAppointment, cancelBooking } = require("./appointmentController")
const isLoggedIn = require("../../middlewares/isLogin")
const router = require("express").Router()

router.post("/booking/appointment",isLoggedIn,bookAppointment)
router.delete("/cancel/appointment",isLoggedIn,cancelBooking)


module.exports = router