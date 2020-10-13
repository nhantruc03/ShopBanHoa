const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const banner = Schema(
    {
        name: {
            type: String,
            index: true,
            required: true
        },
        link: {
            type: String,
            index: true,
            required: true
        },
        image: {
            type: String,
            index: true,
            required: true
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
            index: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('banners', banner);
