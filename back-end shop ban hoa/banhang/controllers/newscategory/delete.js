const { isEmpty } = require('lodash')
const Newscategories = require('../../model/newscategory')

const _delete = async (req, res) => {
  try {
    const deletedNewscategories = await Newscategories.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (isEmpty(deletedNewscategories)) {
      return res.status(406).json({
        success: false,
        error: "Deleted failed"
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedNewscategories
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { _delete }