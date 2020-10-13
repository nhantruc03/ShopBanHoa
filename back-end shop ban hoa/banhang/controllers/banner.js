const Banner = require("../model/banner");
const { isEmpty, pick } = require("lodash");
const { startSession } = require("mongoose");
const { commitTransactions, abortTransactions } = require("../services/transaction");
const { json } = require("body-parser");
const { storeImage } = require('../services/storeimage');
exports.create = async (req, res, next) => {
    let sessions = [];
    try {
        const name = req.body.name;
        const link = req.body.link;
        const image = req.body.image;
        // Check not enough property
        if (isEmpty(name) || isEmpty(link) || isEmpty(image)) {
            return res.status(406).json({
                success: false,
                error: "Not enough property"
            });
        }

        // Transactions
        let session = await startSession();
        session.startTransaction();
        sessions.push(session);

        var filename;
        if (!isEmpty(req.body.image)) {
            filename = storeImage(req.body.image);
        }
        //Create
        const newBanner = await Banner.create(
            [
                {
                    ...pick(
                        req.body,
                        "name",
                        "link"
                    ),
                    image: filename
                }
            ],
            { session: session }
        );

        if (isEmpty(newBanner)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Created failed"
            });
        }

        // Check exist
        const oldBanner = await Banner.find({
            name: name,
            isDeleted: false
        });


        if (oldBanner.length > 0) {
            await abortTransactions(sessions);
            return res.status(409).json({
                success: false,
                error: "This Banner is already exist"
            });
        }


        // Done
        await commitTransactions(sessions);

        return res.status(200).json({
            success: true,
            data: newBanner[0]
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
        const banner = await Banner.findOne({ _id: req.params.id, isDeleted: false });

        if (isEmpty(banner)) {
            return res.status(404).json({
                success: false,
                error: "Not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: banner
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAll = async (req, res, next) => {
    const page = Number(req.query.page); // page index
    const limit = Number(req.query.limit); // limit docs per page
    try {
        let Banners;
        let query = {
            ...pick(req.body, "name", "link"),
            isDeleted: false
        };

        if (!page || !limit) {
            Banners = await Banner.find(query)
                .select(
                    "name link image isDeleted"
                );
        } else {
            Banners = await Banner.find(query)
                .select(
                    "name link image isDeleted"
                )
                .skip(limit * (page - 1))
                .limit(limit);
        }

        return res.status(200).json({ success: true, data: Banners });
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

        if (!isEmpty(req.body.image)) {
            filename = storeImage(req.body.Image);
        }
        if (!isEmpty(req.body.oldimage)) {
            filename = req.body.oldimage;
        }
        const updateBanner = await Banner.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            {
                ...pick(
                    req.body,
                    "name",
                    "link",
                    "isDeleted"
                ),
                image: filename
            },
            { session, new: true }
        );

        if (isEmpty(updateBanner)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Updated failed"
            });
        }

        // Check exist
        if (req.body.name) {
            let isChangeName = true;
            const [Banners, beforeUpdated] = await Promise.all([
                Banners.find({ name: req.body.name, isDeleted: false }),
                Banners.findOne({
                    _id: req.params.id,
                    isDeleted: false
                })
            ]);

            if (beforeUpdated.name === updateBanner.name) {
                isChangeName = false;
            }

            if (Banners.length > 0 && isChangeName) {
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
            data: updateBanner
        });
    } catch (error) {
        await abortTransactions(sessions);
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedBanner = await Banner.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (isEmpty(deletedBanner)) {
            return res.status(406).json({
                success: false,
                error: "Deleted failed"
            });
        }

        return res.status(200).json({
            success: true,
            data: deletedBanner
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};