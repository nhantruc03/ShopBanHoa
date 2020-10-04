const mongoose = require('mongoose');
const product = new mongoose.Schema(
    {
        'Name': String,
        'MetaTitle': String,
        'Detail': String,
        'Description': String,
        'Image': String,
        'MoreImages': Array,
        'Price': Number,
        'PromotionPrice': Number,
        'Quantity': Number,
        'CategoryId': Array,
        'Status': Boolean
    }, { collection: 'product' });
module.exports = mongoose.model('product', product);
