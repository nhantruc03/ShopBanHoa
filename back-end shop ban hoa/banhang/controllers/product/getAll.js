const { pick } = require('lodash');
const Product = require('../../model/product')

const getAll = async (req, res) => {
  const page = Number(req.query.page); // page index
  const limit = Number(req.query.limit); // limit docs per page
  try {
    let Products;
    let query = {
      ...pick(req.body, "name", "metatitle", "detail", "description", "price", "promotionprice", "quantity", "image", "moreimages", "categoryId"),
      isDeleted: false
    };

    if (!page || !limit) {
      Products = await Product.find(query)
        .select(
          "name metatitle detail description price promotionprice quantity image moreimages isDeleted"
        )
        .populate("categoryId", "name");
    } else {
      Products = await Product.find(query)
        .select(
          "name metatitle detail description price promotionprice quantity image moreimages isDeleted"
        )
        .populate("categoryId", "name")
        .skip(limit * (page - 1))
        .limit(limit);
    }

    return res.status(200).json({ success: true, data: Products });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getAll }