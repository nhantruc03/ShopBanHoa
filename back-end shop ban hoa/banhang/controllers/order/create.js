const Order = require("../../model/order")
const { pick, isEmpty } = require("lodash");
const create = async (req, res) => {
  try {
    const customerId = req.body.customerId;
    const shipname = req.body.shipname;
    const shipmobile = req.body.shipmobile;
    const shipaddress = req.body.shipaddress;
    const shipemail = req.body.shipemail;

    // Check not enough property
    if (isEmpty(customerId) || isEmpty(shipname) || isEmpty(shipmobile) || isEmpty(shipaddress) || isEmpty(shipemail)) {
      return res.status(406).json({
        success: false,
        error: "Not enough property"
      });
    }

    //Create
    const newOrder = await Order.create(
      [
        {
          ...pick(
            req.body,
            "customerId",
            "shipname",
            "shipmobile",
            "shipaddress",
            "shipemail"
          )
        }
      ]
    );

    if (isEmpty(newOrder)) {
      return res.status(406).json({
        success: false,
        error: "Created failed"
      });
    }

    return res.status(200).json({
      success: true,
      data: newOrder[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = { create }