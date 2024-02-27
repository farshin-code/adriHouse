const router = require("express").Router();
const { OAuth2Client } = require("google-auth-library");
const url = require("url");
require("dotenv").config();
const JWT = require("jsonwebtoken");
const dbCRUD = require("../controllers/dbCRUD");

router.get("/google/callback", async (req, res) => {
  const code = url.parse(req.url, true).query.code;
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
  );
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  const userInfo = JSON.parse(
    Buffer.from(tokens.id_token.split(".")[1], "base64").toString()
  );
  const user = await dbCRUD.findOrCreateGoogleUser(userInfo.email);
  // const query = new URLSearchParams();
  // query.append("fullName", userInfo.name);
  // query.append("username", userInfo.email);
  // res.redirect("/auth/gcreate?" + query.toString());
  const token = JWT.sign(
    {
      fullName: user.fullName,
      username: user.username,
      role: user.role,
      isGoogleUser: true,
    },
    "secret",
    { expiresIn: "1h" }
  );
  const query = new URLSearchParams();
  query.append("token", token);
  res.redirect(
    "http://localhost:4200/google-logged-in" + "?" + query.toString()
  );
});
router.get("/glogin", (req, res) => {
  console.log("glogin route");
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
  );
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  import("open").then((open) => {
    open.default(authorizeUrl).then((result) => {
      res.end();
    });
  });
});

// router.get("/gcreate", (req, res) => {
//   const { fullName, username } = req.query;
//   res.send({ fullName, username });
// });

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await dbCRUD.findUser(username, password);
    if (!result) {
      console.log("failed to login from login route");
      res.status(500).send("Failed to login");
    } else {
      const token = JWT.sign(
        {
          userID: result.userID.toString(),
          userRole: result.userRole,
          username: username,
          companyId: result.companyId.toString(),
        },
        "secret",
        { expiresIn: "1h" }
      );
      req.session.user = {
        userID: result.userID.toString(),
        userRole: result.userRole,
        companyId: result.companyId.toString(),
        username: username,
      };

      res.status(200).json({ token });
    }
  } catch (err) {
    console.log("error from auth catch", err);
    res.status(500).send("Failed to login");
  }
});

module.exports.Authroute = router;
