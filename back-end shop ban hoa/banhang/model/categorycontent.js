const mongoose = require('mongoose');
const Categorycontents = new mongoose.Schema(
    {
        name: {
            type: String,
            index: true,
            required: true
        },
        metatitle: {
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
module.exports = mongoose.model('categorycontents', Categorycontents);
