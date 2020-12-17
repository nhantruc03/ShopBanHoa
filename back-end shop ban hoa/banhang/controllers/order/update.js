const Order = require('../../model/order')
const { isEmpty, pick } = require('lodash');
const update = async (req, res) => {
  try {

    const updateOrder = await Order.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      {
        ...pick(
          req.body,
          "status"
        )
      },
      { new: true }
    );

    if (isEmpty(updateOrder)) {
      return res.status(406).json({
        success: false,
        error: "Updated failed"
      });
    }
    return res.status(200).json({
      success: true,
      data: updateOrder
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { update }