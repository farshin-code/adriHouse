const companyRestricted = (req, res, next) => {
  companyId = req.session.user.companyId;

  if (!companyId) {
    res.status(500).send("Unauthorized from companyRestricted");
  }

  req.query.companyId = companyId;
  next();
};

module.exports = companyRestricted;
