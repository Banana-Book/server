const express = require('express');
const router = express.Router();

const ROLES = require('../../data/roles.constant.json');

const postController = require("../../controllers/post.controller");

const postValidators = require("../../validators/post.validators");
const runValidations = require("../../validators/index.middleware");

const { authentication, authorization } = require("../../middlewares/auth.middlewares");

router.get("/", postController.findAll);
router.get("/:identifier",
    postValidators.findPostByIdValidator,
    runValidations,
    postController.findOneByID);

router.post("/", 
    authentication,
    authorization(ROLES.USER),
    postValidators.createPostValidator, 
    runValidations,  
    postController.create);

router.get("/search/:title",
    postValidators.filterPostByTitleValidator,
    runValidations,
    postController.filterByTitle
    
)

router.get("/filter/:category",
    postValidators.filterPostByCategoryValidator,
    runValidations,
    postController.filterByCategory
    
)
module.exports = router;