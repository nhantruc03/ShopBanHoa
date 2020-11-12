const mongoose = require('mongoose');
const News = new mongoose.Schema(
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
        description: {
            type: String,
            index: true,
            required: true
        },
        content: {
            type: String,
            index: true,
            required: true
        },
        image: {
            type: String,
            index: true,
            required: true
        },
        newscategoryId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'newscategories',
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
module.exports = mongoose.model('news', News);
