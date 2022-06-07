const { request, response } = require('express');
const { Usuario } = require('../models');
const { encriptar } = require('../helpers/encriptar');

module.exports = {
    async getUsuario(req = request, res = response){
        const { id } = req.params;
        try{
            const usuario = await Usuario.findById( id );
            return res.json({
                error: false,
                mensaje: 'Usuario obtenido con éxito',
                usuario
            });
        } catch(err){
            return res.status( 400 ).json({
                error: true,
                mensaje: 'No ha sido posible dar con este usuario',
            });
        }
    },
    async getUsuarios( req = request, res = response ){
        try{
            const usuarios = await Usuario.find({ estado: true });
            return res.json({
                error: false,
                mensaje: 'Usuarios obtenidos con éxito',
                usuarios
            });
        }catch( err ){
            return res.status( 500 ).json({
                error: true, 
                mensaje: 'No ha sido posible dar con los usuarios',
            });
        }
    },
    async createUsuario( req = request, res = response ){
        const { estado, google, fecha, contrasena, ...data } = req.body;
        const hash = encriptar( contrasena );

        try{
            const usuario = new Usuario( {
                fecha: new Date().getTime(),
                contrasena: hash,
                ...data
            } );
            await usuario.save();
            return res.json({
                error: false,
                mensaje: 'El usuario ha sido creado con éxito',
                usuario
            });
        }catch( err ){
            return res.status(500).json({
                error: true, 
                mensaje: 'No se pudo crear este usuario',
            });
        }    
    },
    async updateUsuario( req = request, res = response ){
        const { id } = req.params;
        //Al obtener el jwt y empaquetar el id en el req, verificar si son iguales, sino es el caso, 401 unauthorized
        //Si el rol del usuario tiene el privilegio 'A'
        const { estado, google, fecha, rol, contrasena, ...data } = req.body;
        try{
            if( contrasena ) data.contrasena = encriptar( contrasena );
            const usuario = await Usuario.findByIdAndUpdate( id, data, { new: true } );
            return res.json({
                error: false,
                mensaje: 'Usuario actualizado con éxito',
                usuario
            });
        }catch( err ){
            res.status(500).json({
                error: true, 
                mensaje: 'No se ha podido actualizar este usuario'
            });
        }
    },
    async deleteUsuario( req = request, res = response ){
        const { id } = req.params;
        try{
            const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
            return res.json({
                error: false,
                mensaje: 'El usuario fué eliminad con éxito',
                usuario
            })
        }catch(err){
            return res.status(500).json({
                error: true, 
                mensaje: 'El usuario no pudo borrarse'
            });
        }
    }
}