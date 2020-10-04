var express = require('express');
var router = express.Router();
var fs = require('fs');
var mime = require('mime');
var isEmpty = require('lodash.isempty');
const products = require('../model/product');

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
    catch {
    }
}


/* GET home page. */
router.get('/list', function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    products.find({}, function (err, data) {
        res.send(data);
    })
});

router.get('/delete/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    var id = req.params.id;
    products.findByIdAndRemove(id).exec();
    res.send('delete success');
});

router.get('/edit/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    var id = req.params.id;
    products.find({ _id: id }, function (err, data) {
        res.send(data);
    });
});


router.post('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    products.findById(id, function (err, data) {
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

        // create list more images
        var listmore = []
        if (!isEmpty(req.body.MoreImages)) {
            var listimages = [];
            listimages = req.body.MoreImages;
            for (var i = 0; i < listimages.length; i++) {
                listmore.push(storeImage(listimages[i]));
            }
        }
        if (!isEmpty(req.body.OldMoreImages)) {
            var listimages = [];
            listimages = req.body.OldMoreImages;
            for (var i = 0; i < listimages.length; i++) {
                listmore.push(listimages[i]);
            }
        }
        data.Image = filename;
        data.MoreImages = listmore;
        data.PromotionPrice = req.body.PromotionPrice;
        data.Price = req.body.Price;
        data.Quantity = req.body.Quantity;
        data.CategoryId = req.body.CategoryId;
        data.Status = req.body.Status;
        data.Name = req.body.Name;
        data.MetaTitle = req.body.MetaTitle;
        data.Detail = req.body.Detail;
        data.Description = req.body.Description;
        console.log(data);
        data.save();
        res.send('Edit thành công');
    })
});

router.post('/add', function (req, res, next) {
    try {
        var filename;
        if (!isEmpty(req.body.Image)) {
            filename = storeImage(req.body.Image);
        }
        var listmore = []

        if (!isEmpty(req.body.MoreImages)) {
            var listimages = [];
            listimages = req.body.MoreImages;
            for (var i = 0; i < listimages.length; i++) {
                listmore.push(storeImage(listimages[i]));
            }
        }
        else {
            console.log('null');
        }
        var object = {
            'Name': req.body.Name,
            'MetaTitle': req.body.MetaTitle,
            'Detail': req.body.Detail,
            'Description': req.body.Description,
            'Image': filename,
            'MoreImages': listmore,
            'Price': req.body.Price,
            'PromotionPrice': req.body.PromotionPrice,
            'Quantity': req.body.Quantity,
            'CategoryId': req.body.CategoryId,
            'Status': req.body.Status
        }
        console.log(object);
        var data = new products(object);
        data.save();
        res.send('Insert thành công');
    }
    catch {
        res.status(400).send('insert không thành công');
    }
});

module.exports = router;
