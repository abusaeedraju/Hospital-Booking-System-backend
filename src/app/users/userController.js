const { getUserIdFromToken } = require("../../helpers/jwtProvider");
const Appointment = require("../service/appointmentModel");
const {
  createUser,
  getUserProfileByToken,
  updatePassword,
  forgotPassword,
  resetPass,
} = require("./userService");

const register = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    }
    res.status(400).json({ success: false, message: "Registration failed" });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(404).send("token not found");
    }
    const user = await getUserProfileByToken(token);
    if (!user) {
      return res.status(404).send("user not found");
    }
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const updatePasswordById = async (req, res, next) => {
  try {
    const updatedUser = await updatePassword(req);
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = await forgotPassword(email);
    return res.status(200).json({
      success: true,
      message: `please go to your email ${email} for completing your password retrieve process`,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { otp, password, email } = req.body;
    const newPassword = await resetPass(otp, password, email);
    if (!newPassword) {
      return res
        .status(400)
        .json({ success: true, message: "password reset fail" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Password created successfully" });
  } catch (error) {
    next(error);
  }
};

const getUserAppointment = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const userId = await getUserIdFromToken(token);
    const result = await Appointment.findOne({patient:userId});
    if (!result) {
      return res
        .status(404)
        .json({
          success: false,
          message: "You haven't booked any appointment",
        });
    }
    res
      .status(200)
      .json({ success: true, message: "your appointment...", data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getUserProfile,
  updatePasswordById,
  forgetPassword,
  resetPassword,
  getUserAppointment,
};
