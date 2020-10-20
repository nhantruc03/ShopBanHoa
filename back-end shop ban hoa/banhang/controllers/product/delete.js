const { isEmpty } = require('lodash')
const Product = require('../../model/product')

const _delete = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (isEmpty(deletedProduct)) {
      return res.status(406).json({
        success: false,
        error: "Deleted failed"
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedProduct
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { _delete }