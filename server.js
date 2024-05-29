const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const corsOptions = {
  origin: [
    'http://roberts-13-inch-macbook-pro.local:3000',
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Databse Connected Successfully!!');
  })
  .catch((err) => {
    console.log('Could not connect to the database', err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.json({ message: 'Hello Crud Node Express' });
});
app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});

const UserRoute = require('./routes/User');
app.use('/user', UserRoute);
