const { isEmpty } = require('lodash');
const Categorycontents = require('../../model/categorycontent')

const get = async (req, res) => {
  try {
    const categorycontents = await Categorycontents.findOne({ _id: req.params.id, isDeleted: false });

    if (isEmpty(categorycontents)) {
      return res.status(406).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: categorycontents
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { get }