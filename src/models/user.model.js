const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  companyName: String,
  role: String,
  password: String
});

const User = model('User', userSchema);
module.exports = User