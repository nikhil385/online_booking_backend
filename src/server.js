const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose')

const app = express();
const corsOptions = {
  origin: ['https://thriving-bienenstitch-eb5012.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', routes);
// app.use(express.urlencoded({ extended: true }));

require('dotenv').config()

const mongoDB = process.env.MONGODB_URI;

async function main() {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

main().catch((err) => console.error(err));


if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

module.exports = app
