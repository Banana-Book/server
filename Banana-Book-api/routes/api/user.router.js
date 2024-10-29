const Express = require("express");
const router = Express.Router();

const userController = require("../../controllers/user.controller");
const runValidation = require("../../validators/index.middleware");

router.get("/profile", runValidation, userController.findOneByID);

module.exports = router;
