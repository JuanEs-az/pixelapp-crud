const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { Usuario, Calendario } = require('../models');
const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('ui-token')
    if( !token ) return res.status( 401 ).json({
        error: true,
        mensaje: 'El token del usuario es requerido para acceder a este servicio'
    });
    try{
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.usuario = await Usuario.findById( uid ).populate('rol');
        next();
    }catch( err ){
        return res.status(401).json({
            error: true, 
            mensaje: 'El token dado no es válido'
        });
    }
};
const validacionesUsuario = {
    async Admin( usuario, req ){
        return usuario.rol.rango == "A";
    },
    async AdminOIDUsuario(usuario, req){
        return usuario.rol.rango == "A" || usuario._id == req.params.id; 
    },
    async Default( usuario, req ){
        return true;
    },
    async AdminOCreador_Calendario(usuario, req){
        const calendario = await Calendario.findById( req.params.id ).populate('usuario');
        console.log(calendario.usuario._id, usuario._id);
        return usuario.rol.rango == "A" || usuario._id == calendario.usuario._id.toString();
    }
};
const validarUsuario = function( params = 'Default' ){
    //Admin
    //AdminOUsuario
    return async(req = request, res = response, next) => {
        const usuario = req.usuario;
        console.log(usuario);
        if( !usuario || !usuario.estado || usuario.rol.rango == "B" ) return res.status( 401 ).json({
            error: true,
            mensaje: 'El usuario dado no tiene acceso a este servicio, Baneado'
        });

        const validacion = validacionesUsuario[params];
        if( await validacion(usuario, req) ) next();
        else return res.status( 401 ).json({
            error: true,
            mensaje: 'El usuario dado no tiene acceso a este servicio'
        });

    }
};

module.exports = {
    validarJWT,
    validarUsuario
};