const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../users/userService");
const { generateToken } = require("../../helpers/jwtProvider");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not exist ,Please recheck your email.",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password..." });
    }
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = generateToken(payload);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "none",
      maxAge: 86400000, // 24 hour 24*60*60*1000
    });
    return res.status(200).json({ success: true, message: "login successful" });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout };
