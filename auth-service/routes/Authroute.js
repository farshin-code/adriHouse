const router = require("express").Router();
const { logins } = require("../controllers/logins");

router.get("/google/callback", logins.callback);

router.get("/glogin", logins.glogin);

router.post("/login", logins.login);

module.exports.Authroute = router;
