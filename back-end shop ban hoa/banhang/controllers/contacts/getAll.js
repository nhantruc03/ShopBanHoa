const { pick } = require('lodash');
const Contact = require('../../model/contacts')

const getAll = async (req, res) => {
  const page = Number(req.query.page); // page index
  const limit = Number(req.query.limit); // limit docs per page
  try {
    let Contacts;
    let query = {
      ...pick(req.body, "name", "email", "subject","message"),
      isDeleted: false
    };

    if (!page || !limit) {
      Contacts = await Contact.find(query)
        .select(
          "name email subject message isDeleted"
        );
    } else {
      Contacts = await Contact.find(query)
        .select(
          "name email subject message isDeleted"
        )
        .skip(limit * (page - 1))
        .limit(limit);
    }

    return res.status(200).json({ success: true, data: Contacts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getAll }