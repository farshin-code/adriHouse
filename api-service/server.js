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
require("dotenv").config();
const app = express();
redisinit()
  .then((redisClient) => {
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
  })
  .finally(() => {
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
  });
