const { body } = require('express-validator');

const validators = {};
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/;

validators.registerValidator = [
    body("email")
        .notEmpty().withMessage("El correo es requerido")
        .isEmail().withMessage("El correo no es válido"),
    body("name")
        .notEmpty().withMessage("El nombre es requerido"),
    body("lastName")
        .notEmpty().withMessage("El apellido es requerido"),
    body("password")
        .notEmpty().withMessage("La contraseña es requerida")
        .matches(passwordRegex).withMessage("La contraseña debe tener al menos 8 caracteres, un número, una mayúscula y un carácter especial")
];

module.exports = validators;