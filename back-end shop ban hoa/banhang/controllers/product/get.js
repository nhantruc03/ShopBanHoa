const { isEmpty } = require('lodash');
const Product = require('../../model/product')

const get = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isDeleted: false });

    if (isEmpty(product)) {
      return res.status(406).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { get }