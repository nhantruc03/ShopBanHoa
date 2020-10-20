const Order = require('../../model/order')
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

    const updateOrder = await Order.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      {
        ...pick(
          req.body,
          "customerId",
          "shipname",
          "shipmobile",
          "shipaddress",
          "shipemail"
        )
      },
      { session, new: true }
    );

    if (isEmpty(updateOrder)) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "Updated failed"
      });
    }

    // Done
    await commitTransactions(sessions);

    return res.status(200).json({
      success: true,
      data: updateOrder
    });
  } catch (error) {
    await abortTransactions(sessions);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { update }