const JWT = require("jsonwebtoken");
const isAdmin = (req, res, next) => {
  console.log("session from isAdmin", req.session?.user);
  try {
    if (req.session?.user.userRole === "admin") {
      next();
    }
  } catch (err) {
    res.status(500).send("Unauthorized from isAdmin");
  }
};

const isAuthenticated = (req, res, next) => {
  // check both methods of authentication in case if cookies are not set or supported
  try {
    if (req.session?.user) {
      next();
    } else if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(" ")[1];
      // console.log("token from isAuthenticated", token);
      if (!token) {
        res.status(500).send("Unauthorized from isAuthenticated/token");
      }
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        next();
      } else {
        res.status(500).send("Unauthorized from isAuthenticated/token/decoded");
      }
    } else {
      res.status(500).send("Unauthorized from isAuthenticated/else");
    }
  } catch (err) {
    console.log("error from isAuthenticated", err);
    res.status(500).send("Unauthorized from isAuthenticated/error");
  }
};

module.exports = { isAdmin, isAuthenticated };
