const Category = require("../../model/category")
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { pick, isEmpty } = require("lodash");
const create = async (req, res) => {
  let sessions = [];
  try {
    const name = req.body.name;
    const metatitle = req.body.metatitle;
    const categorycontentsId = req.body.categorycontentsId;
    // Check not enough property
    if (isEmpty(name) || isEmpty(metatitle) || isEmpty(categorycontentsId)) {
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
            "metatitle",
            "categorycontentsId"
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
    }, null, { session });


    if (oldCategory.length > 1) {
      await abortTransactions(sessions);
      return res.status(406).json({
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
}

module.exports = { create }