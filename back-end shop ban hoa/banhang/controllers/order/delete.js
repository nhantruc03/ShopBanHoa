const { isEmpty } = require('lodash')
const Order = require('../../model/order')

const _delete = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (isEmpty(deletedOrder)) {
      return res.status(406).json({
        success: false,
        error: "Deleted failed"
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedOrder
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { _delete }