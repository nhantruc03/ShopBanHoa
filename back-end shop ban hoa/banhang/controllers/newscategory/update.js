const Newscategories = require('../../model/newscategory')
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
        Newscategories.find({ name: req.body.name, isDeleted: false }, null, { session }),
        Newscategories.findOne({
          _id: req.params.id,
          isDeleted: false
        })
      ]);

      if (beforeUpdated.name === updateNewscategories.name) {
        isChangeName = false;
      }

      if (Newscategoriess.length > 1 && isChangeName) {
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
      data: updateNewscategories
    });
  } catch (error) {
    await abortTransactions(sessions);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { update }