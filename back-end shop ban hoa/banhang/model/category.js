const mongoose = require('mongoose');
const category = new mongoose.Schema(
    {
        categorycontentsId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'categorycontents',
            index:true,
            required:true
        },
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
module.exports = mongoose.model('categories', category);
