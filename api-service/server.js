const express = require("express");
const { APIroute } = require("./routes/APIroute");
const session = require("express-session");
const Redis = require("redis");
const RedisStore = require("connect-redis").default;
const redisinit = require("./redisinit");
const cors = require("cors");
const {
  appErrorHandler,
  logError,
  clientErrorHandler,
} = require("./middleWares/errors");
const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, //60 minutes
  limit: 10, // IP
  standardHeaders: "draft-7",
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

require("dotenv").config();

const startSever = async () => {
  const app = express();
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
  app.use(limiter);
  app.use(cors({ origin: "http://localhost:4200", credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", APIroute);
  app.use(logError);
  app.use(clientErrorHandler);
  app.use(appErrorHandler);
  const port = process.env.API_SERVER_PORT || 3000;
  app.listen(port, () => {
    console.log(`API Server is running on port ${port}`);
  });

  return app;
};

process.env.adriHouse_test.trim() !== "true" && startSever();

module.exports = startSever;

// const app = express();
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
//     app.use(cors({ origin: "http://localhost:4200", credentials: true }));
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));
//     app.use("/api", APIroute);
//     app.use(logError);
//     app.use(clientErrorHandler);
//     app.use(appErrorHandler);
//     const port = process.env.API_SERVER_PORT || 3000;
//     app.listen(port, () => {
//       console.log(`API Server is running on port ${port}`);
//     });
//   });
