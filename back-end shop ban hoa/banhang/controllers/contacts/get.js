const { isEmpty } = require('lodash');
const Contact = require('../../model/contacts')

const get = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, isDeleted: false });

    if (isEmpty(contact)) {
      return res.status(406).json({
        success: false,
        error: "Not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { get }