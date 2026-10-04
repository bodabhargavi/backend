const Client = require('../models/Client');

const createClient = async (req, res) => {
  try {
    const { name, email, phone, presentingConcern, history, consentGiven } = req.body;

    const client = await Client.create({
      therapist: req.therapistId,
      name,
      email,
      phone,
      intake: {
        presentingConcern,
        history,
        consentGiven,
        consentTimestamp: consentGiven ? new Date() : null,
      },
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ therapist: req.therapistId }).sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id, therapist: req.therapistId });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createClient, getClients, getClientById };