const News = require('../../model/news')
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { isEmpty, pick } = require('lodash');
const {storeImage} = require('../../services/storeimage');
const update = async (req, res) => {
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
        News.find({ name: req.body.name, isDeleted: false }, null, { session }),
        News.findOne({
          _id: req.params.id,
          isDeleted: false
        })
      ]);

      if (beforeUpdated.name === updateNews.name) {
        isChangeName = false;
      }

      if (Newss.length > 1 && isChangeName) {
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
      data: updateNews
    });
  } catch (error) {
    await abortTransactions(sessions);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { update }