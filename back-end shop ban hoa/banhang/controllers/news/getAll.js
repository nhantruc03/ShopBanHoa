const { pick } = require('lodash');
const News = require('../../model/news')

const getAll = async (req, res) => {
  const page = Number(req.query.page); // page index
  const limit = Number(req.query.limit); // limit docs per page
  try {
    const newscategoryId = req.body.newscategoryId;
    let Newss;
    let query = {
      ...pick(req.body, "name", "metatitle", "description", "image", "newscategoryId"),
      isDeleted: false
    };

    if (!page || !limit) {
      Newss = await News.find(query)
        .select(
          "name metatitle description image newscategoryId isDeleted"
        )
        .populate("newscategoryId", "name");
    } else {
      Newss = await News.find(query)
        .select(
          "name metatitle description image newscategoryId isDeleted"
        )
        .populate("newscategoryId", "name")
        .skip(limit * (page - 1))
        .limit(limit);
    }

    return res.status(200).json({ success: true, data: Newss });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getAll }