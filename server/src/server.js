const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sequelize } = require('../models')
const cors = require('cors');
const userRoute = require('./userController');
const trailerRoute = require('./trailerController');


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(userRoute);
app.use(trailerRoute);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    await sequelize.authenticate()
    console.log(`Listening on port ${port}..`)
});