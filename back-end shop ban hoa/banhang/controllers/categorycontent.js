const Categorycontents = require("../model/categorycontent");
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
        const newCategorycontents = await Categorycontents.create(
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

        if (isEmpty(newCategorycontents)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Created failed"
            });
        }

        // Check exist
        const oldCategorycontents = await Categorycontents.find({
            name: name,
            isDeleted: false
        });


        if (oldCategorycontents.length > 0) {
            await abortTransactions(sessions);
            return res.status(409).json({
                success: false,
                error: "This Categorycontents is already exist"
            });
        }


        // Done
        await commitTransactions(sessions);

        return res.status(200).json({
            success: true,
            data: newCategorycontents[0]
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
        const categorycontents = await Categorycontents.findOne({ _id: req.params.id, isDeleted: false });

        if (isEmpty(categorycontents)) {
            return res.status(404).json({
                success: false,
                error: "Not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: categorycontents
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAll = async (req, res, next) => {
    const page = Number(req.query.page); // page index
    const limit = Number(req.query.limit); // limit docs per page
    try {
        let Categorycontentss;
        let query = {
            ...pick(req.body, "name", "metatitle"),
            isDeleted: false
        };

        if (!page || !limit) {
            Categorycontentss = await Categorycontents.find(query)
                .select(
                    "name metatitle isDeleted"
                );
        } else {
            Categorycontentss = await Categorycontents.find(query)
                .select(
                    "name metatitle isDeleted"
                )
                .skip(limit * (page - 1))
                .limit(limit);
        }

        return res.status(200).json({ success: true, data: Categorycontentss });
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

        const updateCategorycontents = await Categorycontents.findOneAndUpdate(
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

        if (isEmpty(updateCategorycontents)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Updated failed"
            });
        }

        // Check exist
        if (req.body.name) {
            let isChangeName = true;
            const [Categorycontentss, beforeUpdated] = await Promise.all([
                Categorycontents.find({ name: req.body.name, isDeleted: false }),
                Categorycontents.findOne({
                    _id: req.params.id,
                    isDeleted: false
                })
            ]);

            if (beforeUpdated.name === updateCategorycontents.name) {
                isChangeName = false;
            }

            if (Categorycontentss.length > 0 && isChangeName) {
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
            data: updateCategorycontents
        });
    } catch (error) {
        await abortTransactions(sessions);
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedCategorycontents = await Categorycontents.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (isEmpty(deletedCategorycontents)) {
            return res.status(406).json({
                success: false,
                error: "Deleted failed"
            });
        }

        return res.status(200).json({
            success: true,
            data: deletedCategorycontents
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};