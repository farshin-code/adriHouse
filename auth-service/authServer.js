const express = require("express");
const session = require("express-session");
const Redis = require("redis");
const RedisStore = require("connect-redis").default;
const { Authroute } = require("./routes/Authroute");
const cors = require("cors");
const redisinit = require("./redisinit");
require("dotenv").config();
const app = express();

const startServer = async () => {
  try {
    const redisClient = await redisinit();
    const redisStore = new RedisStore({
      client: redisClient,
      prefix: "myapp:",
    });

    app.use(
      session({
        store: redisStore,
        secret: "keyboard cat",
        cookie: { maxAge: 3600000 },
        resave: false,
        saveUninitialized: false,
      })
    );

    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:4200",
        ],
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/auth", Authroute);
    const port = process.env.AUTH_SERVER_PORT || 3001;
    const authserver = app.listen(port, () => {
      console.log(`Authentication Server is running on port ${port}`);
    });

    return authserver;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

process.env.adriHouse_test.trim() !== "true" && startServer();

module.exports = startServer;
// redisinit()
//   .then((redisClient) => {
//     const redisStore = new RedisStore({
//       client: redisClient,
//       prefix: "myapp:",
//     });
//     app.use(
//       session({
//         store: redisStore,
//         secret: "keyboard cat",
//         cookie: { maxAge: 3600000 },
//         resave: false,
//         saveUninitialized: false,
//       })
//     );
//   })
//   .finally(() => {
//     app.use(
//       cors({
//         origin: [
//           "http://localhost:3000",
//           "http://localhost:3001",
//           "http://localhost:4200",
//         ],
//         credentials: true,
//       })
//     );
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));
//     app.use("/auth", Authroute);
//     const port = process.env.AUTH_SERVER_PORT || 3001;
//     const authserver = app.listen(port, () => {
//       console.log(`Authentication Server is running on port ${port}`);
//     });
//     module.exports = authserver;
//   });
