const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  dayOfWeek: { type: Number, required: true }, // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  startTime: { type: String, required: true }, // e.g. "09:00"
  endTime: { type: String, required: true },   // e.g. "17:00"
  sessionDuration: { type: Number, default: 60 }, // in minutes
}, { timestamps: true });

module.exports = mongoose.model('Availability', availabilitySchema);