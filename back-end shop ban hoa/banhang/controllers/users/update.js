const Users = require('../../model/users')
const { handleBody } = require('./handleBody')
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction')
const bcrypt = require("bcrypt")
const update = async (req, res) => {
  let sessions = []
  try {
    const queryOld = {
      $or: [
        { username: req.body.username },
      ],
      isDeleted: false
    }
    const queryUpdate = { _id: req.params.id, isDeleted: false }

    // Handle data
    const { error, body } = handleBody(req.body) // for newDoc
    if (error) {
      return res.status(406).json({
        success: false,
        error: error
      })
    }

    // Transactions
    let session = await startSession();
    session.startTransaction();
    sessions.push(session);
    if (body.password != null) {
      body.password = await bcrypt.hashSync(body.password, 10);
    }
    const updated = await Users.findOneAndUpdate(
      queryUpdate,
      body,
      { session, new: true }
    );


    const oldDocs = await Users.find(queryOld, null, { session });

    // Check duplicate
    if (oldDocs.length > 1) {
      await abortTransactions(sessions)
      return res.status(406).json({
        success: false,
        error: "Duplicate data"
      })
    }

    // Updated Successfully
    await commitTransactions(sessions)
    return res.status(200).json({
      success: true,
      data: updated
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = { update }