const OrderDetail = require("../../model/orderdetail")
const Product = require("../../model/product")
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { pick, isEmpty } = require("lodash");
const create = async (req, res) => {
  let sessions = [];
  try {
    const productId = req.body.productId;
    const orderId = req.body.orderId;
    const quantity = req.body.quantity;
    const price = req.body.price;
    // Check not enough property
    if (isEmpty(productId) || isEmpty(orderId) || !quantity || !price) {
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
    const newOrderDetail = await OrderDetail.create(
      [
        {
          ...pick(
            req.body,
            "productId",
            "orderId",
            "quantity",
            "price"
          )
        }
      ],
      { session: session }
    );

    if (isEmpty(newOrderDetail)) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "Created failed"
      });
    }

    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId, isDeleted: false },
      {
        $inc: { 'quantity': -quantity }
      },
      { session, new: true }
    );

    if (isEmpty(updateProduct) || updateProduct.quantity < 0) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "out of stock"
      });
    }


    // check exist
    const oldOrderdetails = await OrderDetail.find({
      orderId: orderId,
      productId: productId,
      isDeleted: false
    }, null, { session });


    if (oldOrderdetails.length > 1) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "This Prescriptiondetails is already exist"
      });
    }
    // Done
    await commitTransactions(sessions);

    return res.status(200).json({
      success: true,
      data: newOrderDetail[0]
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