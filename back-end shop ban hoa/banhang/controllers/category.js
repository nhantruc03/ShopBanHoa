const Category = require("../model/category");
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
        const newCategory = await Category.create(
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

        if (isEmpty(newCategory)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Created failed"
            });
        }

        // Check exist
        const oldCategory = await Category.find({
            name: name,
            isDeleted: false
        });


        if (oldCategory.length > 0) {
            await abortTransactions(sessions);
            return res.status(409).json({
                success: false,
                error: "This Category is already exist"
            });
        }


        // Done
        await commitTransactions(sessions);

        return res.status(200).json({
            success: true,
            data: newCategory[0]
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
        const category = await Category.findOne({ _id: req.params.id, isDeleted: false });

        if (isEmpty(category)) {
            return res.status(404).json({
                success: false,
                error: "Not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAll = async (req, res, next) => {
    const page = Number(req.query.page); // page index
    const limit = Number(req.query.limit); // limit docs per page
    try {
        const categoryId = req.body.CategorycategoriesId;

        let Categorys;
        let query = {
            ...pick(req.body, "name", "metatitle"),
            isDeleted: false
        };

        if (!page || !limit) {
            Categorys = await Category.find(query)
                .select(
                    "name metatitle isDeleted"
                );
        } else {
            Categorys = await Category.find(query)
                .select(
                    "name metatitle isDeleted"
                )
                .skip(limit * (page - 1))
                .limit(limit);
        }

        return res.status(200).json({ success: true, data: Categorys });
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

        const updateCategory = await Category.findOneAndUpdate(
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

        if (isEmpty(updateCategory)) {
            await abortTransactions(sessions);
            return res.status(406).json({
                success: false,
                error: "Updated failed"
            });
        }

        // Check exist
        if (req.body.name) {
            let isChangeName = true;
            const [categorys, beforeUpdated] = await Promise.all([
                Category.find({ name: req.body.name, isDeleted: false }),
                Category.findOne({
                    _id: req.params.id,
                    isDeleted: false
                })
            ]);

            if (beforeUpdated.name === updateCategory.name) {
                isChangeName = false;
            }

            if (categorys.length > 0 && isChangeName) {
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
            data: updateCategory
        });
    } catch (error) {
        await abortTransactions(sessions);
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedCategory = await Category.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (isEmpty(deletedCategory)) {
            return res.status(406).json({
                success: false,
                error: "Deleted failed"
            });
        }

        return res.status(200).json({
            success: true,
            data: deletedCategory
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};