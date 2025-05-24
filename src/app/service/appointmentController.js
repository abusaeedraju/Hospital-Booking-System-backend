const Appointment = require("./appointmentModel");
const User = require("../users/userModel");
const bookAppointment = async (req, res, next) => {
  try {
    const { doctor, day, time } = req.body;
    const patient = await req.user;

    // Check doctor duty
    const schedule = await User.findOne({
      _id: doctor,
      dutySchedule: {
        $elemMatch: {
          day,
        },
      },
    });
    if (!schedule || !schedule.dutySchedule[0].slots.includes(time)) {
      return res
        .status(400)
        .json({ message: "Doctor is not available at this time." });
    }
    // Check if slot already booked
    const existing = await Appointment.findOne({ doctor, day, time });
    if (existing) {
      return res
        .status(400)
        .json({ message: "This time slot is already booked. Choose another." });
    }
    //create appointment
    const appointment = new Appointment({
      doctor: doctor,
      patient: patient._id,
      day,
      time,
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: "Service booked successfully!",
      appointment,
    });
  } catch (err) {
    next(err);
  }
};

const cancelBooking = async (req, res, next) => {
  const user = await req.user;
  try {
    const appointment = await Appointment.findOneAndDelete({patient:user._id});
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found!" });
    }
    res
      .status(200)
      .json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bookAppointment,
  cancelBooking,
};
