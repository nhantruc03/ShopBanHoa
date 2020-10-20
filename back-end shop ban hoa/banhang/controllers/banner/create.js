const Banner = require("../../model/banner")
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { pick, isEmpty } = require("lodash");
const { storeImage } = require('../../services/storeimage');
const create = async (req, res) => {
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
    }, null, { session });


    if (oldBanner.length > 1) {
      await abortTransactions(sessions);
      return res.status(406).json({
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
}

module.exports = { create }