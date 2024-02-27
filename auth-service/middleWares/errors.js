const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: "Error in the client side xhr" });
  } else {
    next(err);
  }
};

const logError = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};
const appErrorHandler = (err, req, res, next) => {
  res.status(500).send("Internal Server Error");
};

module.exports = {
  clientErrorHandler,
  logError,
  appErrorHandler,
};
