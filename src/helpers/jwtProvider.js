const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET

const generateToken = (payload) => {
  const token = jwt.sign(payload , SECRET_KEY, { expiresIn: "24h" });
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken._id;
};

module.exports = { generateToken, getUserIdFromToken };
