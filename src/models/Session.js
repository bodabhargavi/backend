const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  duration: { type: Number, default: 60 },
  status: { type: String, enum: ['booked', 'completed', 'cancelled', 'no-show'], default: 'booked' },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);