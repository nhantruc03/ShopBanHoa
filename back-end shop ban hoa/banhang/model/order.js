const mongoose = require('mongoose');
const Order = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'users',
            index: true,
            required: true
        },
        shipname: {
            type: String,
            index: true,
            required: true
        },
        shipmobile:{
            type:String,
            index:true,
            required:true
        },
        shipaddress:{
            type:String,
            index:true,
            required:true
        },
        shipemail:{
            type:String,
            index:true,
            required:true
        },
        status:{
            type: Boolean,
            required: true,
            default: false,
            index: true
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
module.exports = mongoose.model('orders', Order);
