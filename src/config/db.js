const mongoose = require("mongoose");
require("dotenv").config();
const mongodbUrl = process.env.MONGODB_URI;

const connectDb = () => {
  return mongoose.connect(mongodbUrl);
};

module.exports = { connectDb };
