const { pick } = require('lodash');
const Newscategories = require('../../model/newscategory')

const getAll = async (req, res) => {
  const page = Number(req.query.page); // page index
  const limit = Number(req.query.limit); // limit docs per page
  try {
    let Newscategoriess;
    let query = {
      ...pick(req.body, "name", "metatitle"),
      isDeleted: false
    };

    if (!page || !limit) {
      Newscategoriess = await Newscategories.find(query)
        .select(
          "name metatitle isDeleted"
        );
    } else {
      Newscategoriess = await Newscategories.find(query)
        .select(
          "name metatitle isDeleted"
        )
        .skip(limit * (page - 1))
        .limit(limit);
    }

    return res.status(200).json({ success: true, data: Newscategoriess });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getAll }