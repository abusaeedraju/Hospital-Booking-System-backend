const User = require("../users/userModel");
const Service = require("../service/serviceModel");
const { getUserByEmail, createUser } = require("../users/userService");

// Add a new doctor
const addDoctor = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }
    const doctor = await createUser(req.body);
    return res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: doctor,
    });
  } catch (err) {
    next(err);
  }
};
//update doctor profile
const updateDoctor = async (req, res, next) => {
  try {
    const doctorId = req.params.id;
    const updateData = req.body;

    const updatedDoctor = await User.findByIdAndUpdate(
      doctorId,
      updateData
    ).select("-password");
    return res.status(200).json({
      success: true,
      message: "update successful",
      data: updatedDoctor,
    });
  } catch (err) {
    next(err);
  }
};

// remove Doctor Profile
const removeDoctor = async (req, res, next) => {
  try {
    const doctorId = req.params.id;
    const doctor = await User.findByIdAndDelete(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Schedule doctor duty
const scheduleDuty = async (req, res, next) => {
  const doctorId = req.params.id;
  const scheduleData = req.body;
  try {
    const doctor = await User.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const scheduledDoctor = await User.findByIdAndUpdate(
      doctorId,
      scheduleData
    ).select("-password");
    return res
      .status(200)
      .json({ success: true, message: "update successful", scheduledDoctor });
  } catch (err) {
    next(err);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Users are...", data: users });
  } catch (error) {
    next(error);
  }
};

// Add a new service
const addService = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    const existing = await Service.findOne({ name });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Service already exists" });
    }

    const service = new Service({
      name,
      price,
    });

    await service.save();
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// Update a service
const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedService = await Service.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedService) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    res.json({
      success: true,
      message: "Service updated",
      data: updatedService,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a service
const removeService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Service.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addDoctor,
  updateDoctor,
  removeDoctor,
  scheduleDuty,
  addService,
  updateService,
  removeService,
  getAllUser,
};
