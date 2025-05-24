const bcrypt = require("bcryptjs");
const User = require("../app/users/userModel");
exports.createSuperAdmin = async () => {
  const findAdmin = await User.findOne({
    email: "admin123@gmail.com",
  });
  if (!findAdmin) {
    const hash = await bcrypt.hash("12345678", 10);
    const createAdmin = await User.create({
      email: "admin123@gmail.com",
      password: hash,
      name: "Super Admin",
      role: "admin",
    });
    return createAdmin;
  }else{
    return
  }
};
