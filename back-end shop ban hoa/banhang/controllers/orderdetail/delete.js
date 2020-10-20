const { isEmpty } = require('lodash')
const OrderDetail = require('../../model/orderdetail')

const _delete = async (req, res) => {
  try {
    const deletedOrderDetail = await OrderDetail.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (isEmpty(deletedOrderDetail)) {
      return res.status(406).json({
        success: false,
        error: "Deleted failed"
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedOrderDetail
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { _delete }