const { pick } = require('lodash');
const Category = require('../../model/category')

const getAll = async (req, res) => {
  const page = Number(req.query.page); // page index
  const limit = Number(req.query.limit); // limit docs per page
  try {
    let Categorys;
    let query = {
      ...pick(req.body, "name", "metatitle", "categorycontentsId"),
      isDeleted: false
    };

    if (!page || !limit) {
      Categorys = await Category.find(query)
        .select(
          "name metatitle categorycontentsId isDeleted"
        )
        .populate("categorycontentsId", "name");
    } else {
      Categorys = await Category.find(query)
        .select(
          "name metatitle categorycontentsId isDeleted"
        )
        .populate("categorycontentsId", "name")
        .skip(limit * (page - 1))
        .limit(limit);
    }

    return res.status(200).json({ success: true, data: Categorys });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getAll }