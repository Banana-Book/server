const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constant.json");

const postController = require("../../controllers/post.controller");

const postValidators = require("../../validators/post.validators");
const runValidations = require("../../validators/index.middleware");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth.middlewares");

router.post(
  "/send-email",
  authentication,
  authorization(ROLES.USER),
  postValidators.sendEmailValidator,
  runValidations,
  postController.sendEmail
);

router.get(
  "/:identifier",
  postValidators.findPostByIdValidator,
  runValidations,
  postController.findOneByID
);

router.post(
  "/",
  authentication,
  authorization(ROLES.USER),
  postValidators.createPostValidator,
  runValidations,
  postController.create
);

router.get(
  "/",
  postController.filter
);

router.get(
  "/filter/:category",
  postValidators.filterPostByCategoryValidator,
  runValidations,
  postController.filterByCategory
);

router.patch(
  "/:identifier",
  authentication,
  authorization(ROLES.USER),
  postValidators.updatePostValidator,
  runValidations,
  postController.update
);

router.delete(
  "/:identifier",
  authentication,
  authorization(ROLES.USER),
  postValidators.updatePostValidator,
  runValidations,
  postController.delete
);

// put hidden post
router.patch(
  "/:identifier/hidden",
  authentication,
  authorization(ROLES.USER),
  postValidators.hidePostValidator,
  runValidations,
  postController.hidden
);

router.get("/getByUser/:identifier",
  authentication,
  authorization(ROLES.USER),
  postValidators.updatePostValidator,
  runValidations,
  postController.findByUser
);

module.exports = router;
