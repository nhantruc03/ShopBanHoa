const Newscategories = require("../model/newscategory");
const { isEmpty, pick } = require("lodash");
const { startSession } = require("mongoose");
const { commitTransactions, abortTransactions } = require("../services/transaction");
const { json } = require("body-parser");

exports.create = async (req, res, next) => {
    let sessions = [];
    try {
        const name = req.body.name;
        const metatitle = req.body.metatitle;
        // Check not enough property
        if (isEmpty(name) || isEmpty(metatitle)) {
            return res.status(406).json({
                success: false,
                error: "Not enough property"
            });
        }

        // Transactions
        let session = await startSession();
        session.startTransaction();
        sessions.push(session);

        //Create
        const newNewscategories = await Newscategories.create(
            [
                {
                    ...pick(
                        req.body,
                        "name",
                        "metatitle"
                    )
                }
            ],
            { session: session }
        );

        if (isEmpty(newNewscategories)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Created failed"
            });
        }

        // Check exist
        const oldNewscategories = await Newscategories.find({
            name: name,
            isDeleted: false
        });


        if (oldNewscategories.length > 0) {
            await abortTransactions(sessions);
            return res.status(409).json({
                success: false,
                error: "This Newscategories is already exist"
            });
        }


        // Done
        await commitTransactions(sessions);

        return res.status(200).json({
            success: true,
            data: newNewscategories[0]
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
        const newscategories = await Newscategories.findOne({ _id: req.params.id, isDeleted: false });

        if (isEmpty(newscategories)) {
            return res.status(404).json({
                success: false,
                error: "Not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: newscategories
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAll = async (req, res, next) => {
    const page = Number(req.query.page); // page index
    const limit = Number(req.query.limit); // limit docs per page
    try {
        let Newscategoriess;
        let query = {
            ...pick(req.body, "name", "metatitle"),
            isDeleted: false
        };

        if (!page || !limit) {
            Newscategoriess = await Newscategories.find(query)
                .select(
                    "name metatitle isDeleted"
                );
        } else {
            Newscategoriess = await Newscategories.find(query)
                .select(
                    "name metatitle isDeleted"
                )
                .skip(limit * (page - 1))
                .limit(limit);
        }

        return res.status(200).json({ success: true, data: Newscategoriess });
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

        const updateNewscategories = await Newscategories.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            {
                ...pick(
                    req.body,
                    "name",
                    "metatitle",
                    "isDeleted"
                )
            },
            { session, new: true }
        );

        if (isEmpty(updateNewscategories)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Updated failed"
            });
        }

        // Check exist
        if (req.body.name) {
            let isChangeName = true;
            const [Newscategoriess, beforeUpdated] = await Promise.all([
                Newscategories.find({ name: req.body.name, isDeleted: false }),
                Newscategories.findOne({
                    _id: req.params.id,
                    isDeleted: false
                })
            ]);

            if (beforeUpdated.name === updateNewscategories.name) {
                isChangeName = false;
            }

            if (Newscategoriess.length > 0 && isChangeName) {
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
            data: updateNewscategories
        });
    } catch (error) {
        await abortTransactions(sessions);
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedNewscategories = await Newscategories.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (isEmpty(deletedNewscategories)) {
            return res.status(406).json({
                success: false,
                error: "Deleted failed"
            });
        }

        return res.status(200).json({
            success: true,
            data: deletedNewscategories
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};