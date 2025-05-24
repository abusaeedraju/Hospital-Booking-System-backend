const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "rtraju2016@gmail.com",
    pass: "rsgo kprs uprd lonp",
  },
});

const emailWithNodeMailer = async (email,otp) => {
  try {
    const mailOption = {
      from: "rtraju2016@gmail.com",
      to: email,
      subject: "Your OTP code",
      html: `
      <h2> Your OTP code</h2>
      <p> Please provide this otp code : ${otp} to  activate your account  </p>
      `,
    };
   const info= await transporter.sendMail(mailOption);
    console.log("message sent %s", info.response);
    return 
  } catch (error) {
    console.error("Error occurred while sending email : ", error);
    throw Error(error.message);
  }
};

module.exports = emailWithNodeMailer;
