const { isEmpty } = require('lodash');
const Documents = require('../../model/document')

const get = async (req, res) => {
  try {
    const Document = await Documents.findOne({ _id: req.params.id, isDeleted: false });

    if (isEmpty(Document)) {
      return res.status(406).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: Document
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { get }