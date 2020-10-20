const { isEmpty } = require('lodash');
const Banner = require('../../model/banner')

const get = async (req, res) => {
  try {
    const banner = await Banner.findOne({ _id: req.params.id, isDeleted: false });

    if (isEmpty(banner)) {
      return res.status(404).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: banner
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { get }