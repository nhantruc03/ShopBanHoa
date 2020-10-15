const Product = require("../model/product");
const { isEmpty, pick } = require("lodash");
const { startSession } = require("mongoose");
const { commitTransactions, abortTransactions } = require("../services/transaction");
const { json } = require("body-parser");
const { storeImage } = require('../services/storeimage');



exports.create = async (req, res, next) => {
    let sessions = [];
    try {
        const name = req.body.name;
        const metatitle = req.body.metatitle;
        const detail = req.body.detail;
        const description = req.body.description;
        const image = req.body.image;
        const moreimages = req.body.moreimages;
        const price = req.body.price;
        const quantity = req.body.quantity;
        const categoryId = req.body.categoryId;

        // Check not enough property
        if (isEmpty(name) || isEmpty(metatitle) || isEmpty(detail) || isEmpty(description) || isEmpty(image) || !price || !quantity || isEmpty(categoryId)) {
            return res.status(406).json({
                success: false,
                error: "Not enough property"
            });
        }

        // Transactions
        let session = await startSession();
        session.startTransaction();
        sessions.push(session);

        var categoryId_arr = req.body.categoryId.split(',');
        var filename;
        if (!isEmpty(req.body.image)) {
            filename = storeImage(req.body.image);
        }
        
        // create list more images
        var listmore = []
        if (!isEmpty(req.body.moreimages)) {
            var listimages = req.body.moreimages.split(',d');
            if (listimages instanceof Array) {
                for (var i = 0; i < listimages.length; i++) {
                    if(i!=0)
                    {
                        listimages[i]="d"+listimages[i];
                    }
                    listmore.push(storeImage(listimages[i]));
                }
            }
            else {
                listmore.push(storeImage(listimages));
            }
        }

        //Create
        const newProduct = await Product.create(
            [
                {
                    ...pick(
                        req.body,
                        "name",
                        "metatitle",
                        "detail",
                        "description",
                        "price",
                        "promotionprice",
                        "quantity"
                    ),
                    categoryId: categoryId_arr,
                    image: filename,
                    moreimages: listmore
                }
            ],
            { session: session }
        );

        if (isEmpty(newProduct)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Created failed"
            });
        }

        // Check exist
        const oldProduct = await Product.find({
            name: name,
            isDeleted: false
        });


        if (oldProduct.length > 0) {
            await abortTransactions(sessions);
            return res.status(409).json({
                success: false,
                error: "This Product is already exist"
            });
        }


        // Done
        await commitTransactions(sessions);

        return res.status(200).json({
            success: true,
            data: newProduct[0]
        });
    } catch (error) {
        await abortTransactions(sessions);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.get = async (req, res, next) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, isDeleted: false });

        if (isEmpty(product)) {
            return res.status(404).json({
                success: false,
                error: "Not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAll = async (req, res, next) => {
    const page = Number(req.query.page); // page index
    const limit = Number(req.query.limit); // limit docs per page
    try {
        const categoryId = req.body.categoryId;
        let Products;
        let query = {
            ...pick(req.body, "name", "metatitle", "detail", "description", "price", "promotionprice", "quantity", "image", "moreimages", "categoryId"),
            isDeleted: false
        };

        if (!page || !limit) {
            Products = await Product.find(query)
                .select(
                    "name metatitle detail description price promotionprice quantity image moreimages isDeleted"
                )
                .populate("categoryId", "name");
        } else {
            Products = await Product.find(query)
                .select(
                    "name metatitle detail description price promotionprice quantity image moreimages isDeleted"
                )
                .populate("categoryId", "name")
                .skip(limit * (page - 1))
                .limit(limit);
        }

        return res.status(200).json({ success: true, data: Products });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.update = async (req, res, next) => {
    let sessions = [];
    
    try {
        // Transactions
        let session = await startSession();
        session.startTransaction();
        sessions.push(session);
        var filename;

        
        var categoryId_arr = req.body.categoryId.split(',');

        if (!isEmpty(req.body.image)) {
            filename = storeImage(req.body.image);
        }
        if (!isEmpty(req.body.oldimage)) {
            filename = req.body.oldimage;
        }
        
        // create list more images
        var listmore = []
        if (!isEmpty(req.body.moreimages)) {
            var listimages = req.body.moreimages.split(',d');
            if (listimages instanceof Array) {
                for (var i = 0; i < listimages.length; i++) {
                    if(i!=0)
                    {
                        listimages[i]="d"+listimages[i];
                    }
                    listmore.push(storeImage(listimages[i]));
                }
            }
            else {
                listmore.push(storeImage(listimages));
            }
        }
        if (!isEmpty(req.body.oldmoreimages)) {
            var listimages =  req.body.oldmoreimages.split(',');
            if (listimages instanceof Array) {
                for (var i = 0; i < listimages.length; i++) {
                    listmore.push(listimages[i]);
                }
            }
            else {
                listmore.push(listimages.toString());
            }
        }
        const updateProduct = await Product.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            {
                ...pick(
                    req.body,
                    "name",
                    "metatitle",
                    "detail",
                    "description",
                    "price",
                    "promotionprice",
                    "quantity"
                ),
                categoryId: categoryId_arr,
                image: filename,
                moreimages: listmore
            },
            { session, new: true }
        );
        if (isEmpty(updateProduct)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Updated failed"
            });
        }

        // Check exist
        if (req.body.name) {
            let isChangeName = true;
            const [products, beforeUpdated] = await Promise.all([
                Product.find({ name: req.body.name, isDeleted: false }),
                Product.findOne({
                    _id: req.params.id,
                    isDeleted: false
                })
            ]);

            if (beforeUpdated.name === updateProduct.name) {
                isChangeName = false;
            }

            if (products.length > 0 && isChangeName) {
                await abortTransactions(sessions);
                return res.status(409).json({
                    success: false,
                    error: "This name is already exist"
                });
            }
        }

        // Done
        await commitTransactions(sessions);

        return res.status(200).json({
            success: true,
            data: updateProduct
        });
    } catch (error) {
        await abortTransactions(sessions);
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (isEmpty(deletedProduct)) {
            return res.status(406).json({
                success: false,
                error: "Deleted failed"
            });
        }

        return res.status(200).json({
            success: true,
            data: deletedProduct
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};