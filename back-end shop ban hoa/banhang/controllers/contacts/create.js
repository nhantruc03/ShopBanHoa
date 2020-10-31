const Contact = require("../../model/contacts")
const { pick, isEmpty } = require("lodash");
const create = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message
    // Check not enough property
    if (isEmpty(name) || isEmpty(email) || isEmpty(subject) || isEmpty(message)) {
      return res.status(406).json({
        success: false,
        error: "Not enough property"
      });
    }
    
    //Create
    const newContact = await Contact.create(
      [
        {
          ...pick(
            req.body,
            "name",
            "email",
            "subject",
            "message"
          )
        }
      ]
    );

    if (isEmpty(newContact)) {
      return res.status(406).json({
        success: false,
        error: "Created failed"
      });
    }

    return res.status(200).json({
      success: true,
      data: newContact[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = { create }