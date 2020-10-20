const Banner = require('../../model/banner')
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { isEmpty, pick } = require('lodash');
const { storeImage } = require('../../services/storeimage');
const update = async (req, res) => {
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
        Banner.find({ name: req.body.name, isDeleted: false }, null, { session }),
        Banner.findOne({
          _id: req.params.id,
          isDeleted: false
        })
      ]);

      if (beforeUpdated.name === updateBanner.name) {
        isChangeName = false;
      }

      if (Banners.length > 1 && isChangeName) {
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
      data: updateBanner
    });
  } catch (error) {
    await abortTransactions(sessions);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { update }