const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['admin', 'doctor', 'patient'],
    default: 'patient'
  },

  // Optional for doctors
  specialization: {
    type: String
  },

  // Optional: only applies to doctors
  dutySchedule: [{
    day: [String],           // e.g., 'Monday'
    startTime: { type: String },     // e.g., '09:00'
    endTime: { type: String }    ,
    slots: [String], // ['09:00', '09:30', '10:00']    // e.g., '17:00'
  }]
  
}, {
  timestamps: true
});


module.exports = mongoose.model('User', userSchema);
