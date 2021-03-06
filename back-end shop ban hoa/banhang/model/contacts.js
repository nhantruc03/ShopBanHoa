const mongoose = require('mongoose');
const Contacts = new mongoose.Schema(
    {
        name: {
            type: String,
            index: true,
            required: true
        },
        email: {
            type: String,
            index: true,
            required: true
        },
        subject:{
            type: String,
            index: true,
            required:true
        },
        message:{
            type:String,
            index:true,
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
module.exports = mongoose.model('contacts', Contacts);
