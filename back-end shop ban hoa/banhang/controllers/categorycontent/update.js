const Categorycontents = require('../../model/categorycontent')
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
        Categorycontents.find({ name: req.body.name, isDeleted: false }, null, { session }),
        Categorycontents.findOne({
          _id: req.params.id,
          isDeleted: false
        })
      ]);

      if (beforeUpdated.name === updateCategorycontents.name) {
        isChangeName = false;
      }

      if (Categorycontentss.length > 1 && isChangeName) {
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
      data: updateCategorycontents
    });
  } catch (error) {
    await abortTransactions(sessions);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { update }