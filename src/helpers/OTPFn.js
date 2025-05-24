
const Otp = require("./OtpModel");
const emailWithNodeMailer = require("./nodemailer")

exports.OTPFn = async (email) => {
  const otp = Math.floor(Math.random() * 1000000);
  const OTP = await Otp.create({ otp, email });

  await emailWithNodeMailer(email, otp);
  return OTP
};
