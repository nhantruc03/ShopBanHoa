var express = require('express');
var router = express.Router();
var isEmpty = require('lodash.isempty');
const categories = require('../model/category');

/* GET home page. */
router.get('/list', function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    categories.find({}, function (err, data) {
        res.send(data);
    })
});

router.get('/delete/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    var id = req.params.id;
    categories.findByIdAndRemove(id).exec();
    res.send('delete success')
});

router.get('/edit/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    var id = req.params.id;
    categories.find({ _id: id }, function (err, data) {
        res.send(data);
    });
});


router.post('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    categories.findById(id, function (err, data) {
        if (err) {
            return handleError(err);
        }
        data.Name = req.body.Name;
        data.MetaTitle = req.body.MetaTitle;
        data.Status = req.body.Status;
        console.log(data);
        data.save();
        res.send('Edit thành công');
    })
});

router.post('/add', function (req, res, next) {
    try {
        var object = {
            'Name': req.body.Name,
            'MetaTitle': req.body.MetaTitle,
            'Status': req.body.Status
        }
        console.log(object);
        var data = new categories(object);
        data.save();
        res.send('Insert thành công');
    }
    catch {
        res.status(400).send('insert không thành công');
    }
});

module.exports = router;
