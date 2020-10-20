const { isEmpty } = require('lodash');
const News = require('../../model/news')

const get = async (req, res) => {
  try {
    const news = await News.findOne({ _id: req.params.id, isDeleted: false });

    if (isEmpty(news)) {
      return res.status(406).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { get }