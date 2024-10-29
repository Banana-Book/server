const User = require("../models/User.model");
const { verifyToken } = require("../utils/jwt.tools");
const debug = require("debug")("app:user:controller");

const controller = {};

controller.findOneByID = async (req, res) => {
  try {
    const { authorization } = req.headers;

    const [, token] = authorization.split(" ");

    const tokenObject = verifyToken(token);

    const { userID } = tokenObject;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ error: "User no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    debug({ error });
    res.status(500).json({ error: "Error interno de servidor" });
  }
};

module.exports = controller;
