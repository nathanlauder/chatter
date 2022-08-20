const mongoose = require('mongoose');
const express = require('express');

const cors = require('cors');
const { routeAllRoutes } = require('./router');

const app = express();
require('dotenv').config();

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
routeAllRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = app;