const mongoose = require('mongoose');
const product = new mongoose.Schema(
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
        detail: {
            type: String,
            index: true,
            required: true
        },
        description: {
            type: String,
            index: true,
            required: true
        },
        image: {
            type: String,
            index: true,
            required: true
        },
        moreimages: {
            type: Array,
            index: true,
            required: true
        },
        price: {
            type: Number,
            index: true,
            required: true
        },
        promotionprice: {
            type: Number,
            index: true,
            required: false
        },
        quantity: {
            type: Number,
            index: true,
            required: true
        },
        categoryId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'categories',
                index: true,
                require: true
            }
        ],
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
            index: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('products', product);
