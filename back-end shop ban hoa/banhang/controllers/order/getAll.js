const { pick } = require('lodash');
const order = require('../../model/order');
const Order = require('../../model/order')

const getAll = async (req, res) => {
  const page = Number(req.query.page); // page index
  const limit = Number(req.query.limit); // limit docs per page
  try {
    let Orders;
    let query = {
      ...pick(req.body, "customerId", "shipname", "shipmobile", "shipaddress", "shipemail"),
      isDeleted: false
    };
    console.log(query)
    if (!page || !limit) {
      Orders = await Order.find(query)
        .select(
          "customerId shipname shipmobile shipaddress shipemail createdAt"
        )
        .populate("customerId", "name");
    } else {
      Orders = await Order.find(query)
        .select(
          "customerId shipname shipmobile shipaddress shipemail createdAt"
        )
        .populate("customerId", "name")
        .skip(limit * (page - 1))
        .limit(limit);
    }
    console.log(Orders)
   

    return res.status(200).json({ success: true, data: Orders });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getAll }