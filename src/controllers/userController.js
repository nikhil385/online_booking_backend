const User = require('../models/user.model')

exports.login = (req, res) => {
  // Validate request
  const { username, password } = req.body
  if (!username) {
    res.status(400).send({
      message: "username can not be empty!"
    });
    return;
  }

  if (!password) {
    res.status(400).send({
      message: "password can not be empty!"
    });
    return;
  }

  User.find({  username })
    .then(data => {
      if (data.length > 0 && data[0].password === password) {
        res.send(data[0]);
      } else {
        res.status(401).send({
          message: "Incorrect username or password."
        })
      }

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};