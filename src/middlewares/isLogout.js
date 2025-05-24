
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const isLoggedOut = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, SECRET_KEY);
      if (decodedToken) {
        return res.status(401).send("Already LoggedIn");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  next();
};
module.exports = { isLoggedOut };
