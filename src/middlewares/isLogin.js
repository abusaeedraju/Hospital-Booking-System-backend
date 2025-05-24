const { getUserById } = require("../app/users/userService");
const { getUserIdFromToken } = require("../helpers/jwtProvider");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("token not found");
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      return res.status(401).send("Invalid token, Login again");
    }
    const user = getUserById(userId);
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};
module.exports = isLoggedIn;
