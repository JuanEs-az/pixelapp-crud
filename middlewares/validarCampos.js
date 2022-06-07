const { response, request } = require("express");
const { validationResult } = require("express-validator");
//Función para usar al final de los middlewares
module.exports = {
    validarCampos(req = request, res = response, next){
        const error = validationResult( req );
        if( !error.isEmpty() ) 
            return res.status(400).json({
                error: true,
                mensaje: error.errors[0].msg
            });
        next();
    }
};