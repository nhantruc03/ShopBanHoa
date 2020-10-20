const { isEmpty } = require('lodash');
const Order = require('../../model/order')

const get = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, isDeleted: false });

    if (isEmpty(order)) {
      return res.status(406).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { get }