const { pick } = require('lodash');
const OrderDetail = require('../../model/orderdetail')

const getAll = async (req, res) => {
  const page = Number(req.query.page); // page index
  const limit = Number(req.query.limit); // limit docs per page
  try {
    let OrderDetails;
    let query = {
      ...pick(req.body, "productId", "orderId","quantity"),
      isDeleted: false
    };

    if (!page || !limit) {
      OrderDetails = await OrderDetail.find(query)
        .select(
          "productId orderId quantity price"
        )
        .populate({ path: "productId", select: ["name","promotionprice"] });
    } else {
      OrderDetails = await OrderDetail.find(query)
        .select(
          "productId orderId quantity price"
        )
        .populate({ path: "productId", select: ["price", "name","promotionprice"] })
        .skip(limit * (page - 1))
        .limit(limit);
    }

    return res.status(200).json({ success: true, data: OrderDetails });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getAll }