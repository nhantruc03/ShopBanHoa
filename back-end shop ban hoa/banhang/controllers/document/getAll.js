const { pick } = require('lodash');
const Documents = require('../../model/document')

const getAll = async (req, res) => {
  const page = Number(req.query.page); // page index
  const limit = Number(req.query.limit); // limit docs per page
  try {
    let Documentss;
    let query = {
      ...pick(req.body, "name", "link", "content"),
      isDeleted: false
    };

    if (!page || !limit) {
      Documentss = await Documents.find(query)
        .select(
          "name link content isDeleted"
        )
        .sort({ createdAt: -1 });
    } else {
      Documentss = await Documents.find(query)
        .select(
          "name link content isDeleted"
        )
        .skip(limit * (page - 1))
        .limit(limit)
        .sort({ createdAt: -1 });
    }

    return res.status(200).json({ success: true, data: Documentss });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getAll }