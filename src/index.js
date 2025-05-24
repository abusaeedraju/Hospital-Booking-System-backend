const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const errorHandler = require("./middlewares/globalErrorHandler");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//routing
app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "welcome to Hospital-booking-system", status: true });
});

//user route
const userRoute = require("./app/users/userRoute")
app.use("/api/user",userRoute)
//auth route
const authRoute = require("./app/auth/authRoute");
app.use("/api/auth",authRoute)
// admin route 
const adminRoute = require("./app/admin/adminRoute");
app.use("/api/admin",adminRoute)
// service route 
const serviceRoute = require("./app/service/appointmentRoute");
app.use("/api/service",serviceRoute)



//client error handle
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

//server error handle|global error handle
app.use(errorHandler);

module.exports = app;
