const { isEmpty } = require('lodash');
const Newscategories = require('../../model/newscategory')

const get = async (req, res) => {
  try {
    const newscategories = await Newscategories.findOne({ _id: req.params.id, isDeleted: false });

    if (isEmpty(newscategories)) {
      return res.status(406).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: newscategories
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { get }