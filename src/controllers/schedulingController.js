const Availability = require('../models/Availability');
const Session = require('../models/Session');

const setAvailability = async (req, res) => {
  try {
    const { dayOfWeek, startTime, endTime, sessionDuration } = req.body;

    const availability = await Availability.create({
      therapist: req.therapistId,
      dayOfWeek,
      startTime,
      endTime,
      sessionDuration,
    });

    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAvailability = async (req, res) => {
  try {
    const availability = await Availability.find({ therapist: req.params.therapistId });
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bookSession = async (req, res) => {
  try {
    const { therapistId, clientName, clientEmail, date, startTime, duration } = req.body;

    const existingSession = await Session.findOne({
      therapist: therapistId,
      date,
      startTime,
      status: { $ne: 'cancelled' },
    });

    if (existingSession) {
      return res.status(400).json({ message: 'This slot is already booked' });
    }

    const session = await Session.create({
      therapist: therapistId,
      clientName,
      clientEmail,
      date,
      startTime,
      duration,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ therapist: req.therapistId }).sort({ date: 1, startTime: 1 });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { setAvailability, getAvailability, bookSession, getSessions };