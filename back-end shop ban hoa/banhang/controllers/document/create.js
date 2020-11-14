const Documents = require("../../model/document")
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { pick, isEmpty } = require("lodash");
const create = async (req, res) => {
  let sessions = [];
  try {
    const name = req.body.name;
    const link = req.body.link;
    const content = req.body.content;

    // Check not enough property
    if (isEmpty(name) || isEmpty(link) || isEmpty(content)) {
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
    const newDocuments = await Documents.create(
      [
        {
          ...pick(
            req.body,
            "name",
            "link",
            "content"
          )
        }
      ],
      { session: session }
    );

    if (isEmpty(newDocuments)) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "Created failed"
      });
    }

    // Check exist
    const oldDocuments = await Documents.find({
      name: name,
      isDeleted: false
    }, null, { session });


    if (oldDocuments.length > 1) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "This Documents is already exist"
      });
    }


    // Done
    await commitTransactions(sessions);

    return res.status(200).json({
      success: true,
      data: newDocuments[0]
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