const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    //Validando los parametros
    const errors = validationResult(req);

    //Verificando si hay errores
    if(!errors.isEmpty()) {
        //retorno 400

        return res.status(400)
            .json({ 
                errors: errors.array().map(error => ({
                    field: error.param,
                    message: error.msg
                }))
            });
    }

    //Si no hay errores, continuo con el siguiente middleware
    next();
};