const jwt = require("jsonwebtoken");

//variables de entorno
const secret = process.env.TOKEN_SECRET || "SuperSecretKey";
const expiration = process.env.TOKEN_EXP || "15d";

const tools = {};

tools.createToken = (_id, email) => {
  return jwt.sign({ userID: _id, email: email }, secret, {
    expiresIn: expiration,
  });
};

tools.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return false;
  }
};

module.exports = tools;
