const News = require("../../model/news")
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { pick, isEmpty } = require("lodash");
const {storeImage} = require('../../services/storeimage');
const create = async (req, res) => {
  let sessions = [];
  try {
    const name = req.body.name;
    const metatitle = req.body.metatitle;
    const description = req.body.description;
    const image = req.body.image;
    const newscategoryId = req.body.newscategoryId;

    // Check not enough property
    if (isEmpty(name) || isEmpty(metatitle) || isEmpty(description) || isEmpty(image) || isEmpty(newscategoryId)) {
      return res.status(406).json({
        success: false,
        error: "Not enough property"
      });
    }

    // Transactions
    let session = await startSession();
    session.startTransaction();
    sessions.push(session);

    var newscategoryId_arr = req.body.newscategoryId.split(',');
    var filename;
    if (!isEmpty(req.body.image)) {
      filename = storeImage(req.body.image);
    }

    //Create
    const newNews = await News.create(
      [
        {
          ...pick(
            req.body,
            "name",
            "metatitle",
            "description",
          ),
          newscategoryId: newscategoryId_arr,
          image: filename
        }
      ],
      { session: session }
    );

    if (isEmpty(newNews)) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "Created failed"
      });
    }

    // Check exist
    const oldNews = await News.find({
      name: name,
      isDeleted: false
    }, null, { session });


    if (oldNews.length > 1) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "This News is already exist"
      });
    }


    // Done
    await commitTransactions(sessions);

    return res.status(200).json({
      success: true,
      data: newNews[0]
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