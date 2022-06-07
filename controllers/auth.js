const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { Usuario } = require("../models");
const { generarJWT } = require('../helpers/generar-jwt')
module.exports = {
    async login(req = request, res = response){
        const { email, contrasena } = req.body;
        try{

            const usuario = await Usuario.findOne({ email });
            if( !usuario || !usuario.estado || !await bcryptjs.compare( contrasena, usuario.contrasena ) ) 
            return res.status( 400 ).json({
                error: true, 
                mensaje: 'Usuario o Contraseña incorrectos'
            });
            
            const { token } = await generarJWT({ uid: usuario._id })
            return res.json({
                error: false,
                mensaje: 'Usuario logueado con éxito',
                usuario,
                token
            });
        }catch( err ){
            console.log( err );
            return res.status( 500 ).json({
                error: true, 
                mensaje: 'Ha ocurrido un error en el servidor'
            });
        }
    }
};