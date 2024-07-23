const { sign, verify } = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// console.log(secret);
module.exports = {
  signToken: (payload) => sign(payload, secret),
  verifyToken: (token) => verify(token, secret),
};
