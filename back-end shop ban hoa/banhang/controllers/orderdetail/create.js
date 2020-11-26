const OrderDetail = require("../../model/orderdetail")
const Product = require("../../model/product")
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { pick, isEmpty, isArray } = require("lodash");
// const { update } = require("../../model/orderdetail");
const create = async (req, res) => {
  let sessions = [];
  try {

    // If not array, return
    if (isArray(req.body) !== true) {
      return res.status(406).json({
        success: false,
        error: "You must be pass an array"
      });
    }

    // Transactions
    let session = await startSession();
    session.startTransaction();
    sessions.push(session);

    // Prepare data
    let array = req.body.map(e =>
      pick(e,
        "productId",
        "orderId",
        "quantity",
        "price"
      )
    )

    //Create
    const newOrderDetail = await OrderDetail.insertMany(
      array,
      { session: session }
    );

    if (isEmpty(newOrderDetail) || newOrderDetail.length != array.length) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "Created failed"
      });
    }

    // Check exist
    let findOrderdetailMethods = []
    array.forEach(element => {
      findOrderdetailMethods.push(
        OrderDetail.find({
          orderId: element.orderId,
          productId: element.productId,
          price: element.price,
          isDeleted: false
        }, null, { session })
      )
    })
    let oldOrderDetail = await Promise.all(findOrderdetailMethods)

    let checkExist = false;
    oldOrderDetail.forEach(e => {
      if (e.length > 1) {
        checkFail = true
      }
    })
    if (checkExist) {
      await abortTransactions(sessions);
      return res.status(409).json({
        success: false,
        error: "This OrderDetail is already exist"
      });
    }


    // update quantity
    let updateQuantityMethods = []
    array.forEach(element => {
      updateQuantityMethods.push(
        Product.findOneAndUpdate(
          { _id: element.productId, isDeleted: false },
          {
            $inc: { 'quantity': -(element.quantity) }
          },
          { session, new: true }
        )
      )
    })
    // update quantity
    let updatedQuantity = await Promise.all(updateQuantityMethods)

    // check quantity
    if (isEmpty(updatedQuantity) || updatedQuantity.length !== array.length) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "out of stock"
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