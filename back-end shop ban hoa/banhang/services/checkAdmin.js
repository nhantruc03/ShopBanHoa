const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.json({ success: false, error: "Not allow" });
  } else {
    next();
  }
};

module.exports = { isAdmin };
