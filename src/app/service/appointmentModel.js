const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  day: String, 
  time: String, 
  status: { type: String, default: 'booked' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
