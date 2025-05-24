const express = require("express");
const router = express.Router();
const {
  addDoctor,
  removeDoctor,
  scheduleDuty,
  getAllUser,
  updateDoctor,
  addService,
  updateService,
  removeService,
} = require("./adminController");
const isAdmin = require("../../middlewares/isAdmin");
const isLoggedIn = require("../../middlewares/isLogin");

// Only accessible to admin users
router.post("/add/doctor", isLoggedIn, isAdmin, addDoctor);
router.put("/update/doctor/:id", isLoggedIn, isAdmin, updateDoctor);
router.put("/add/doctor/schedule/:id", isLoggedIn, isAdmin, scheduleDuty);
router.delete("/remove/doctor/:id", isLoggedIn, isAdmin, removeDoctor); 
router.post("/add/service", isLoggedIn, isAdmin, addService); 
router.put("/update/service/:id", isLoggedIn, isAdmin, updateService); 
router.delete("/remove/service/:id", isLoggedIn, isAdmin, removeService); 
router.get("/users", isLoggedIn, isAdmin, getAllUser);

module.exports = router;
