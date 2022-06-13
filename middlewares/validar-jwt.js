//Imports
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
//Modelos
const { Usuario, Calendario, Dia } = require('../models');


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
    async Rango(datos, req = request){
        const { rango = "A", usuarioBase } = datos;
        return usuarioBase.rol.rango == rango;
    },
    //Verifica si el usuario tiene un rol o si es el creador de un elemento (C, D)
    async RangoOCreador( datos, req = request ){
        const { rango = "A", modelo, referencia = req.params.id, usuarioBase } = datos;
        const modelos = {
            "C" : Calendario,
            "D" : Dia
        }
        const elemento = await modelos[modelo].findById( elemento );
        return usuarioBase.rol.rango == rango || usuarioBase == elemento.usuario;
    },
    //Verifica si el usuario tiene un rol especifico o si en su defecto es un usuario especifico
    async RangoOUsuario( datos, req = request ){
        const { rango = "A" , usuario = req.params.id, usuarioBase } = datos;
        return usuarioBase.rol.rango == rango || usuarioBase == usuario;
    }
};
const validarUsuario = function( datos = {} ){
    //Admin
    //AdminOUsuario
    const { metodo = 'Rango' } = datos;
    return async(req = request, res = response, next) => {
        const usuario = req.usuario;
        //Verificamos que haya un usuario y que esté activo
        if( !usuario || !usuario.estado || usuario.rol.rango == "B" ) return res.status( 401 ).json({
            error: true,
            mensaje: 'El usuario dado no tiene acceso a este servicio, Baneado'
        });

        datos.usuarioBase = usuario; //Empaquetamos el usuario en los datos para enviar al método
        const validacion = validacionesUsuario[metodo];
        if( await validacion( datos, req ) ) next();
        else return res.status( 401 ).json({
            error: true,
            mensaje: 'El usuario dado no tiene acceso a este servicio'
        });

    };
};

module.exports = {
    validarJWT,
    validarUsuario
};