var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');
const dotenv = require("dotenv");
const helmet = require('helmet');
const mongoose = require('mongoose');
var busboyBodyParser = require('busboy-body-parser');
dotenv.config()
const port = process.env.PORT || 9000

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboyBodyParser());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/anh', express.static('anh'));

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/product'));
app.use('/categories', require('./routes/category'));
app.use('/banners', require('./routes/banner'));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.y19vy.mongodb.net/dbOne?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(result => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.log(error.message);
  });

module.exports = app;
