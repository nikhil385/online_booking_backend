const mongoose = require('mongoose')
const { Schema, model } = mongoose

const eventSchema = new Schema({
  name: String,
  companyName: String,
  proposedDates: [Date],
  proposedLocation: String,
  status: { type: String, default: 'Pending' },
  remarks: String,
  createdAt: { type: Date, default: Date.now },
  confirmedDate: Date,
  userId: String,
  confirmedBy: String
});

const Event = model('Event', eventSchema);
module.exports = Event