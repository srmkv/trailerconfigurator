const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('../models');
const cors = require('cors');
const userRoute = require('./userController');
const trailerRoute = require('./trailerController');
const optionRoute = require('./optionController');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use(userRoute);
app.use(trailerRoute);
app.use(optionRoute);

// Serve React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  await sequelize.authenticate();
  console.log(`Listening on port ${port}..`);
});
