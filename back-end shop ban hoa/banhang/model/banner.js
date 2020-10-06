const mongoose = require('mongoose');
const banner = new mongoose.Schema(
    {
        'Name': String,
        'Link': String,
        'Image': String,
        'Status': Boolean
    }, { collection: 'banner' });
module.exports = mongoose.model('banner', banner);
