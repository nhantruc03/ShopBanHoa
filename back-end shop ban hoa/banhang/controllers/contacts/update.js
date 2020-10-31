const Contact = require('../../model/contacts')
const { isEmpty, pick } = require('lodash');
const update = async (req, res) => {
  try {

    const updateContact = await Contact.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      {
        ...pick(
          req.body,
          "name",
          "email",
          "subject",
          "message",
          "isDeleted"
        )
      },
      { new: true }
    );

    if (isEmpty(updateContact)) {
      return res.status(406).json({
        success: false,
        error: "Updated failed"
      });
    }

    return res.status(200).json({
      success: true,
      data: updateContact
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { update }