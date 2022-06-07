const { request, response  } = require("express");
const { Rol } = require("../models");

module.exports = {
    async getRol( req = request, res = response ){
        const { id } = req.params;
        try{
            const rol = await Rol.findById( id );
            return res.json({
                error: false,
                mensaje: 'El rol fue obtenido con éxito',
                rol
            });
        }catch( err ){
            return res.status(500).json({
                error: true, 
                mensaje: 'No se logró obtener este rol'
            });
        }
    },
    async getRoles( req = request, res = response ){
        try{
            const roles = await Rol.find({ estado: true });
            return res.json({
                error: false,
                mensaje: 'Los roles fueron obtenidos con éxito',
                roles
            });
        }catch( err ){
            return res.status(500).json({
                error: true, 
                mensaje: 'No se lograron obtener los roles'
            });
        }
    },
    async createRol( req = request, res = response ){
        const { fecha, ...data } = req.body;
        try{
            const rol = new Rol( {
                ...data,
                fecha: new Date().getTime()
            } );
            await rol.save();
            return res.json({
                error: false,
                mensaje: 'El rol fue creado con éxito',
                rol
            })
        }catch( err ){
            return res.status(500).json({
                error: true, 
                mensaje: 'El rol no pudo ser creado'
            });
        }
    },
    async updateRol( req = request, res = response ){
        const { id } = req.params;
        const { fecha, ...data } = req.body;
        try{
            const rol = await Rol.findByIdAndUpdate( id, data, { new: true } );
            return res.json({
                error: false, 
                mensaje: 'Rol actualizado con éxito',
                rol
            });
        }catch( err ){
            return res.status(500).json({
                error:  true, 
                mensaje: 'No se logró actualizar el rol'
            });
        }
    },
    async deleteRol( req = request, res = response ){
        const { id } = req.params;
        try{
            const rol = await Rol.findByIdAndDelete( id );
            return res.json({
                error: false,
                mensaje: 'Rol eliminado con éxito',
                rol
            });
        }catch( err ){
            return res.status(500).json({
                error:  true, 
                mensaje: 'No se logró borrar el rol'
            });
        }
    },  
}