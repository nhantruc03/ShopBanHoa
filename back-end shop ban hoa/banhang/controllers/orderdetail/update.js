const OrderDetail = require('../../model/orderdetail')
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { isEmpty, pick } = require('lodash');
const orderdetail = require('../../model/orderdetail');
const update = async (req, res) => {
  let sessions = [];
  try {
    // Transactions
    let session = await startSession();
    session.startTransaction();
    sessions.push(session);

    const updateOrderDetail = await OrderDetail.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      {
        ...pick(
          req.body,
          "productId",
          "orderId",
          "quantity",
          "price"
        )
      },
      { session, new: true }
    );

    if (isEmpty(updateOrderDetail)) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "Updated failed"
      });
    }
    // Check exist
    if (req.body.productId) {
      let isChangeproduct = true;
      const [orderdetails, beforeUpdated] = await Promise.all([
        OrderDetail.find({ productId: req.body.productId, isDeleted: false }, null, { session }),
        OrderDetail.findOne({
          _id: req.params.id,
          isDeleted: false
        })
      ]);

      if (beforeUpdated.productId === updateOrderDetail.productId) {
        isChangeproduct = false;
      }

      if (orderdetails.length > 1 && isChangeproduct) {
        await abortTransactions(sessions);
        return res.status(409).json({
          success: false,
          error: "This order detail is already exist"
        });
      }
    }

    // Done
    await commitTransactions(sessions);

    return res.status(200).json({
      success: true,
      data: updateOrderDetail
    });
  } catch (error) {
    await abortTransactions(sessions);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { update }