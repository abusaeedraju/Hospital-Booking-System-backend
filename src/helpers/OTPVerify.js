const Otp = require("./OtpModel");
const OTPVerify = async (otp, email) => {
  try {
    const result = await Otp.findOne({ otp });
    if (!result) {
      throw new Error("OTP is expired, please request for new OTP");
    }
    if (result.email !== email) {
      throw new Error("Invalid Email");
    }
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = OTPVerify;
