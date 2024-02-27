const Redis = require("redis");

const redisinit = () => {
  return new Promise((resolve, reject) => {
    const redisClient = Redis.createClient({
      // url: `redis://:${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
      Host: process.env.REDIS_URL,
      Port: process.env.REDIS_PORT,
    });
    redisClient.on("error", (err) => {
      console.log("Redis EEError:", err);
      reject(err);
    });
    redisClient.connect().then(() => {
      console.log("Connected to Redis");
      resolve(redisClient);
    });
  });
};

module.exports = redisinit;
