const redis = require("redis");

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.on("error", (error) => {
  console.log(error);
});

redisClient.on("connect", () => {
  console.log("redis is a connected");
});

redisClient.connect();

module.exports = { redisClient };

