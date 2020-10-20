const { isEmpty } = require('lodash');
const Category = require('../../model/category')

const get = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, isDeleted: false });

    if (isEmpty(category)) {
      return res.status(406).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { get }