const { isEmpty } = require('lodash')
const Categorycontents = require('../../model/categorycontent')

const _delete = async (req, res) => {
  try {
    const deletedCategorycontents = await Categorycontents.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (isEmpty(deletedCategorycontents)) {
      return res.status(406).json({
        success: false,
        error: "Deleted failed"
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedCategorycontents
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { _delete }