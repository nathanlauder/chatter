const mongoose = require('mongoose');
const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());
const uri = `${process.env.DB_URI}`;
const port = process.env.PORT || 3000;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

connect();

app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;