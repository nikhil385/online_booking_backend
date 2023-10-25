const Event = require("../models/event.model");
const User = require("../models/user.model");

exports.create = (req, res) => {
  const { name, companyName, proposedDates, proposedLocation, userId } = req.body
  
  const event = {
    name,
    companyName,
    proposedDates,
    proposedLocation,
    userId
  }

  Event.create(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating event."
      });
    });
};

exports.reject = (req, res) => {
  const { id } = req.params
  const { remarks } = req.body

  Event.updateOne(
    { _id: id },
    { status: 'Rejected', remarks })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while rejecting event."
      });
    });
};

exports.approve = (req, res) => {
  const { id } = req.params
  const { confirmedDate, confirmedBy } = req.body
  Event.updateOne(
    { _id: id },
    { status: 'Approved', confirmedDate: new Date(confirmedDate), confirmedBy })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while Approving event."
      });
    });
};

exports.getAll = async (req, res) => {
  let events = []
  const { userId } = req.query
  const user = await User.findById(userId).exec()
  if (user.role === "VENDOR") {
    events = await Event.find({ companyName: user.companyName }).exec()
  } else {
    events = await Event.find({ userId: userId }).exec()
  }
  res.send(events)
};