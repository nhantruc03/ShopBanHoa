const mongoose = require('mongoose');
const Documents = new mongoose.Schema(
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
        content:{
            type: String,
            index: true,
            required:true
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
module.exports = mongoose.model('documents', Documents);
