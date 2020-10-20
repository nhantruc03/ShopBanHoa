const Product = require("../../model/product")
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { pick, isEmpty } = require("lodash");
const { storeImage } = require('../../services/storeimage');
const create = async (req, res) => {
  let sessions = [];
  try {
    const name = req.body.name;
    const metatitle = req.body.metatitle;
    const detail = req.body.detail;
    const description = req.body.description;
    const image = req.body.image;
    const moreimages = req.body.moreimages;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const categoryId = req.body.categoryId;

    // Check not enough property
    if (isEmpty(name) || isEmpty(metatitle) || isEmpty(detail) || isEmpty(description) || isEmpty(image) || !price || !quantity || isEmpty(categoryId)) {
      return res.status(406).json({
        success: false,
        error: "Not enough property"
      });
    }

    // Transactions
    let session = await startSession();
    session.startTransaction();
    sessions.push(session);

    var categoryId_arr = req.body.categoryId.split(',');
    var filename;
    if (!isEmpty(req.body.image)) {
      filename = storeImage(req.body.image);
    }

    // create list more images
    var listmore = []
    if (!isEmpty(req.body.moreimages)) {
      var listimages = req.body.moreimages.split(',d');
      if (listimages instanceof Array) {
        for (var i = 0; i < listimages.length; i++) {
          if (i != 0) {
            listimages[i] = "d" + listimages[i];
          }
          listmore.push(storeImage(listimages[i]));
        }
      }
      else {
        listmore.push(storeImage(listimages));
      }
    }

    //Create
    const newProduct = await Product.create(
      [
        {
          ...pick(
            req.body,
            "name",
            "metatitle",
            "detail",
            "description",
            "price",
            "promotionprice",
            "quantity"
          ),
          categoryId: categoryId_arr,
          image: filename,
          moreimages: listmore
        }
      ],
      { session: session }
    );

    if (isEmpty(newProduct)) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "Created failed"
      });
    }

    // Check exist
    const oldProduct = await Product.find({
      name: name,
      isDeleted: false
    }, null, { session });


    if (oldProduct.length > 1) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "This Product is already exist"
      });
    }


    // Done
    await commitTransactions(sessions);

    return res.status(200).json({
      success: true,
      data: newProduct[0]
    });
  } catch (error) {
    await abortTransactions(sessions);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = { create }