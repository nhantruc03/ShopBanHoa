const Product = require('../../model/product')
const { startSession } = require('mongoose')
const { commitTransactions, abortTransactions } = require('../../services/transaction');
const { isEmpty, pick } = require('lodash');
const { storeImage } = require('../../services/storeimage');
const update = async (req, res) => {
  let sessions = [];

  try {
    // Transactions
    let session = await startSession();
    session.startTransaction();
    sessions.push(session);
    var filename;


    var categoryId_arr = req.body.categoryId.split(',');

    if (!isEmpty(req.body.image)) {
      filename = storeImage(req.body.image);
    }
    if (!isEmpty(req.body.oldimage)) {
      filename = req.body.oldimage;
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
    if (!isEmpty(req.body.oldmoreimages)) {
      var listimages = req.body.oldmoreimages.split(',');
      if (listimages instanceof Array) {
        for (var i = 0; i < listimages.length; i++) {
          listmore.push(listimages[i]);
        }
      }
      else {
        listmore.push(listimages.toString());
      }
    }
    const updateProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
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
      },
      { session, new: true }
    );
    if (isEmpty(updateProduct)) {
      await abortTransactions(sessions);
      return res.status(406).json({
        success: false,
        error: "Updated failed"
      });
    }

    // Check exist
    if (req.body.name) {
      let isChangeName = true;
      const [products, beforeUpdated] = await Promise.all([
        Product.find({ name: req.body.name, isDeleted: false }, null, { session }),
        Product.findOne({
          _id: req.params.id,
          isDeleted: false
        })
      ]);

      if (beforeUpdated.name === updateProduct.name) {
        isChangeName = false;
      }

      if (products.length > 1 && isChangeName) {
        await abortTransactions(sessions);
        return res.status(406).json({
          success: false,
          error: "This name is already exist"
        });
      }
    }

    // Done
    await commitTransactions(sessions);

    return res.status(200).json({
      success: true,
      data: updateProduct
    });
  } catch (error) {
    await abortTransactions(sessions);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { update }