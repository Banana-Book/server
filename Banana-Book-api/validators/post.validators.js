const {body, param} = require('express-validator');
const validators = {};

validators.createPostValidator = [
    body("title")
        .notEmpty().withMessage("El título no debe de ser vacío"),
    body("price")
        .notEmpty().withMessage("El precio no debe de ser vacío")
        .isNumeric().withMessage("El precio debe de ser un número"),
    body("description")
        .notEmpty().withMessage("La descripción no debe de ser vacía")
        .isLength({max: 280}).withMessage("La descripción no debe debe superar los 280 caracteres"),
    body("category")
        .notEmpty().withMessage("La categoría no debe de ser vacía"),
    body("condition")
        .notEmpty().withMessage("La condición no debe de ser vacía"),
    body("image")
        .optional()
        .notEmpty().withMessage("Debes de enviar una imagen")
        .isURL().withMessage("Debes de enviar una URL válida")
];

validators.findPostByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("El id no debe de ir vacío")
        .isMongoId().withMessage("El id debe de ser un id de Mongo válido")
];

module.exports = validators;