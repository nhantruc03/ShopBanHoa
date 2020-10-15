var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');
const dotenv = require("dotenv");
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var mime = require('mime');

var busboyBodyParser = require('busboy-body-parser');
dotenv.config()
const port = process.env.PORT || 9000

var app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboyBodyParser());
app.use(helmet());
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/anh', express.static('anh'));

app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/product'));
app.use('/categories', require('./routes/category'));
app.use('/banners', require('./routes/banner'));
app.use('/categorycontents', require('./routes/categorycontent'));
app.use('/newscategories',require('./routes/newscategory'));
app.use('/news',require('./routes/news'));

app.post("/uploads", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    
    let sampleFile = req.files.upload;
    let extension = mime.extension(sampleFile.mimetype);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filename = uniqueSuffix + '-image.' + extension;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./anh/'+filename, function(err) {
      if (err)
        return res.status(500).send(err);
        res.status(200).json({
          uploaded: true,
          url:
            "http://localhost:9000/anh/"+filename,
        });
    });
  
})

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
