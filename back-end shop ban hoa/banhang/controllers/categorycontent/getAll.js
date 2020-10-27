const { pick } = require('lodash');
const Categorycontents = require('../../model/categorycontent')

const getAll = async (req, res) => {
  const page = Number(req.query.page); // page index
  const limit = Number(req.query.limit); // limit docs per page
  try {
    let Categorycontentss;
    let query = {
      ...pick(req.body, "name", "metatitle"),
      isDeleted: false
    };

    if (!page || !limit) {
      Categorycontentss = await Categorycontents.find(query)
        .select(
          "name metatitle isDeleted"
        )
        .sort({ createdAt: -1 });
    } else {
      Categorycontentss = await Categorycontents.find(query)
        .select(
          "name metatitle isDeleted"
        )
        .skip(limit * (page - 1))
        .limit(limit)
        .sort({ createdAt: -1 });

    }

    return res.status(200).json({ success: true, data: Categorycontentss });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getAll }