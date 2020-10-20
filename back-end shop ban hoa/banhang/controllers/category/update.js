const Category = require('../../model/category')
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { isEmpty, pick } = require('lodash');
const update = async (req, res) => {
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
          "categorycontentsId",
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
        Category.find({ name: req.body.name, isDeleted: false }, null, { session }),
        Category.findOne({
          _id: req.params.id,
          isDeleted: false
        })
      ]);

      if (beforeUpdated.name === updateCategory.name) {
        isChangeName = false;
      }

      if (categorys.length > 1 && isChangeName) {
        await abortTransactions(sessions);
        return res.status(406).json({
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
}

module.exports = { update }