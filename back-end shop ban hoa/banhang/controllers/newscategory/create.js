const Newscategories = require("../../model/newscategory")
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { pick, isEmpty } = require("lodash");
const create = async (req, res) => {
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
    const newNewscategories = await Newscategories.create(
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

    if (isEmpty(newNewscategories)) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "Created failed"
      });
    }

    // Check exist
    const oldNewscategories = await Newscategories.find({
      name: name,
      isDeleted: false
    }, null, { session });


    if (oldNewscategories.length > 1) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "This Newscategories is already exist"
      });
    }


    // Done
    await commitTransactions(sessions);

    return res.status(200).json({
      success: true,
      data: newNewscategories[0]
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