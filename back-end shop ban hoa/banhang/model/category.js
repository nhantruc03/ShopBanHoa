const mongoose = require('mongoose');
const category = new mongoose.Schema(
    {
        'Name': String,
        'MetaTitle':String,
        'Status': Boolean
    }, { collection: 'category' });
module.exports = mongoose.model('category', category);
