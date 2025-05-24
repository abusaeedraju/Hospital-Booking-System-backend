const bcrypt = require("bcryptjs");
const User = require("./userModel");
const { getUserIdFromToken } = require("../../helpers/jwtProvider");
const { OTPFn } = require("../../helpers/OTPFn");
const OTPVerify = require("../../helpers/OTPVerify");

const createUser = async (userData) => {
  try {
    let { name, email, password, role } = userData;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("user already exist with this email!");
    }
    password = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return user;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};
const getUserProfileByToken = async (token) => {
  try {
    const userId = getUserIdFromToken(token);
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePassword = async (req) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;
  const token = req.cookies.token
  const userId = getUserIdFromToken(token);
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("token not found");
  }
  if (newPassword !== confirmPassword) {
    throw new Error("newPassword and ConfirmPassword does not match");
  }
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new Error("Old password is incorrect");
  }
  const hash = await bcrypt.hash(newPassword, 10);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { password: hash },
    { new: true }
  );
  return updatedUser;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not exist");
  }
  OTPFn(email);
  return;
};
const resetPass = async (otp, password, email) => {
  try {
    const verified = await OTPVerify(otp, email);
    if (verified) {
      const hash = await bcrypt.hash(password, 10);
      const newPassword = await User.findOneAndUpdate(
        { email },
        { password: hash },
        { new: true }
      );
      return newPassword;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserProfileByToken,
  updatePassword,
  forgotPassword,
  resetPass,
};
