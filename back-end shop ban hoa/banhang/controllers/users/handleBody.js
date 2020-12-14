const { pick } = require("lodash")

const handleBody = (body) => { 
  if (body.phoneNumber != null && isNaN(body.phoneNumber)) {
    return {
      error: "Số điện thoại không phù hợp!"
    }
  }
  return {
    error: null,
    body: { ...pick(body, 
      "name", 
      "birthday", 
      "address", 
      "phoneNumber",
      "username", 
      "password",
      "role") 
    }
  }
} // for newDoc

module.exports = { handleBody }