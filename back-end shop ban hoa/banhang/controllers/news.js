const News = require("../model/news");
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
        const description = req.body.description;
        const image = req.body.image;
        const newscategoryId = req.body.newscategoryId;

        // Check not enough property
        if (isEmpty(name) || isEmpty(metatitle) || isEmpty(description) || isEmpty(image) || isEmpty(newscategoryId)) {
            return res.status(406).json({
                success: false,
                error: "Not enough property"
            });
        }

        // Transactions
        let session = await startSession();
        session.startTransaction();
        sessions.push(session);

        var newscategoryId_arr = req.body.newscategoryId.split(',');
        var filename;
        if (!isEmpty(req.body.image)) {
            filename = storeImage(req.body.image);
        }

        //Create
        const newNews = await News.create(
            [
                {
                    ...pick(
                        req.body,
                        "name",
                        "metatitle",
                        "description",
                    ),
                    newscategoryId: newscategoryId_arr,
                    image: filename
                }
            ],
            { session: session }
        );

        if (isEmpty(newNews)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Created failed"
            });
        }

        // Check exist
        const oldNews = await News.find({
            name: name,
            isDeleted: false
        });


        if (oldNews.length > 0) {
            await abortTransactions(sessions);
            return res.status(409).json({
                success: false,
                error: "This News is already exist"
            });
        }


        // Done
        await commitTransactions(sessions);

        return res.status(200).json({
            success: true,
            data: newNews[0]
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
        const news = await News.findOne({ _id: req.params.id, isDeleted: false });

        if (isEmpty(news)) {
            return res.status(404).json({
                success: false,
                error: "Not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: news
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAll = async (req, res, next) => {
    const page = Number(req.query.page); // page index
    const limit = Number(req.query.limit); // limit docs per page
    try {
        const newscategoryId = req.body.newscategoryId;
        let Newss;
        let query = {
            ...pick(req.body, "name", "metatitle", "description", "image", "newscategoryId"),
            isDeleted: false
        };

        if (!page || !limit) {
            Newss = await News.find(query)
                .select(
                    "name metatitle description image newscategoryId isDeleted"
                )
                .populate("newscategoryId", "name");
        } else {
            Newss = await News.find(query)
                .select(
                    "name metatitle description image newscategoryId isDeleted"
                )
                .populate("newscategoryId", "name")
                .skip(limit * (page - 1))
                .limit(limit);
        }

        return res.status(200).json({ success: true, data: Newss });
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

        
        var newscategoryId_arr = req.body.newscategoryId.split(',');

        if (!isEmpty(req.body.image)) {
            filename = storeImage(req.body.image);
        }
        if (!isEmpty(req.body.oldimage)) {
            filename = req.body.oldimage;
        }
        
        const updateNews = await News.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            {
                ...pick(
                    req.body,
                    "name",
                    "metatitle",
                    "description"
                ),
                newscategoryId: newscategoryId_arr,
                image: filename
            },
            { session, new: true }
        );
        if (isEmpty(updateNews)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Updated failed"
            });
        }

        // Check exist
        if (req.body.name) {
            let isChangeName = true;
            const [Newss, beforeUpdated] = await Promise.all([
                News.find({ name: req.body.name, isDeleted: false }),
                News.findOne({
                    _id: req.params.id,
                    isDeleted: false
                })
            ]);

            if (beforeUpdated.name === updateNews.name) {
                isChangeName = false;
            }

            if (Newss.length > 0 && isChangeName) {
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
            data: updateNews
        });
    } catch (error) {
        await abortTransactions(sessions);
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedNews = await News.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (isEmpty(deletedNews)) {
            return res.status(406).json({
                success: false,
                error: "Deleted failed"
            });
        }

        return res.status(200).json({
            success: true,
            data: deletedNews
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};