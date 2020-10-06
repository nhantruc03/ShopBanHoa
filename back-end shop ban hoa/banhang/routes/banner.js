var express = require('express');
var router = express.Router();
var fs = require('fs');
var mime = require('mime');
var isEmpty = require('lodash.isempty');
const banners = require('../model/banner');

storeImage = (base64string) => {
    try {
        let matches = base64string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) {
            console.log('Invalid image');
        }
        response.type = matches[1];
        response.data = Buffer.from(matches[2], 'base64');
        let decodeImg = response;
        let imageBuffer = decodeImg.data;
        let type = decodeImg.type;
        let extension = mime.extension(type);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let filename = uniqueSuffix + '-image.' + extension;

        fs.writeFileSync("./anh/" + filename, imageBuffer, 'utf8');
        return filename;
    }
    catch(e) {
        console.log(e);
    }
}

/* GET home page. */
router.get('/list', function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    banners.find({}, function (err, data) {
        res.send(data);
    })
});

router.get('/delete/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    var id = req.params.id;
    banners.findByIdAndRemove(id).exec();
    res.send('delete success')
});

router.get('/edit/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    var id = req.params.id;
    banners.find({ _id: id }, function (err, data) {
        res.send(data);
    });
});


router.post('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    banners.findById(id, function (err, data) {
        if (err) {
            return handleError(err);
        }
        var filename;

        if (!isEmpty(req.body.Image)) {
            filename = storeImage(req.body.Image);
        }
        if (!isEmpty(req.body.OldImage)) {
            filename = req.body.OldImage;
        }
        data.Image=filename;
        data.Name = req.body.Name;
        data.Link = req.body.Link;
        data.Status = req.body.Status;
        console.log(data);
        data.save();
        res.send('Edit thành công');
    })
});

router.post('/add', function (req, res, next) {
    try {
        var filename;
        console.log(req.body.Image);
        if (!isEmpty(req.body.Image)) {
            filename = storeImage(req.body.Image);
        }
        var object = {
            'Name': req.body.Name,
            'Link': req.body.Link,
            'Image': filename,
            'Status': req.body.Status
        }
        console.log(object);
        var data = new banners(object);
        data.save();
        res.send('Insert thành công');
    }
    catch {
        res.status(400).send('insert không thành công');
    }
});

module.exports = router;
