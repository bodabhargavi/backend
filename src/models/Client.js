const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  intake: {
    presentingConcern: { type: String },
    history: { type: String },
    consentGiven: { type: Boolean, default: false },
    consentTimestamp: { type: Date },
  },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);