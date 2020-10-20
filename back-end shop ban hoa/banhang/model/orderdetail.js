const mongoose = require('mongoose');
const OrderDetail = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'products',
            index: true,
            required: true
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'orders',
            index: true,
            required: true
        },
        quantity:{
            type:Number,
            index:true,
            required:true
        },
        price:{
            type:Number,
            required:true,
            index:true
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
module.exports = mongoose.model('orderdetails', OrderDetail);
