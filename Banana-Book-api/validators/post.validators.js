const { body, param } = require("express-validator");
const validators = {};

validators.createPostValidator = [
  body("title").notEmpty().withMessage("El título no debe de ser vacío"),
  body("price")
    .notEmpty()
    .withMessage("El precio no debe de ser vacío")
    .isNumeric()
    .withMessage("El precio debe de ser un número"),
  body("description")
    .notEmpty()
    .withMessage("La descripción no debe de ser vacía")
    .isLength({ max: 280 })
    .withMessage("La descripción no debe debe superar los 280 caracteres"),
  body("category").notEmpty().withMessage("La categoría no debe de ser vacía"),
  body("condition").notEmpty().withMessage("La condición no debe de ser vacía"),
  body("image")
    .optional()
    .notEmpty()
    .withMessage("Debes de enviar una imagen")
    .isURL()
    .withMessage("Debes de enviar una URL válida"),
];

validators.findPostByIdValidator = [
  param("identifier")
    .notEmpty()
    .withMessage("El id no debe de ir vacío")
    .isMongoId()
    .withMessage("El id debe de ser un id de Mongo válido"),
];

validators.hidePostValidator = [
  param("identifier")
    .notEmpty()
    .withMessage("El id no debe de ir vacío")
    .isMongoId()
    .withMessage("El id debe de ser un id de Mongo válido"),
];

validators.sendEmailValidator = [
  body("to")
    .notEmpty()
    .withMessage("El campo 'to' no debe de ser vacío")
    .isEmail()
    .withMessage("El campo 'to' debe de ser un email válido"),
  body("subject")
    .notEmpty()
    .withMessage("El campo 'subject' no debe de ser vacío"),
  body("text").notEmpty().withMessage("El campo 'text' no debe de ser vacío"),
];

validators.filterPostByTitleValidator = [
  param("title")
    .notEmpty()
    .withMessage("El título no debe de ir vacío")
    .isString()
    .withMessage("El título debe de ser una cadena de texto"),
];

validators.filterPostByCategoryValidator = [
  param("category")
    .notEmpty()
    .withMessage("La categoría no debe de ir vacía")
    .isString()
    .withMessage("La categoría debe de ser una cadena de texto"),
];

validators.updatePostValidator = [
  param("identifier").notEmpty().withMessage("El id no debe de ir vacío"),
];

module.exports = validators;
