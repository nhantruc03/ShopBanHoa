const { isEmpty } = require('lodash');
const OrderDetail = require('../../model/orderdetail')

const get = async (req, res) => {
  try {
    const orderdetail = await OrderDetail.findOne({ _id: req.params.id, isDeleted: false });

    if (isEmpty(orderdetail)) {
      return res.status(406).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: orderdetail
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { get }