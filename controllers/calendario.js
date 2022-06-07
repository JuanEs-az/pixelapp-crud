const { request, response } = require('express')
const { Calendario } = require("../models");

module.exports = {
    async getCalendarios( req = request, res = response ){
        try{
            const calendarios = await Calendario.find({estado: true});  
            return res.json({
                error: false, 
                mensaje: 'Calendarios obtenidos con éxito',
                calendarios
            });
        }catch( err ){
            return res.status( 500 ).json({
                error: true,
                mensaje: 'No ha sido posible obtener los calendarios'
            });
        }
    },
    async getCalendario( req = request, res = response ){
        const { id } = req.params;
        try{
            const calendario = await Calendario.findById( id );
            return res.json({
                error: false, 
                mensaje: 'Calendario obtenido con éxito',
                calendario
            })
        }catch( err ){
            return res.status(404).json({
                error: true, 
                mensaje: 'No fue posible hallar este calendario'
            });
        }
    },
    async createCalendario( req = request, res = response ){
        const { nombre, colores, imagenes, aspectos } = req.body;
        const { usuario } = req;
        const fecha = new Date();
        //Nos aseguramos de las limitaciones propias de los usuarios no pagos
        //SI el rango del usuario no está entre A o $ Y SI los aspectos son más de dos O SI los colores más de 5 O SI las imagenes más de 0 ENTONCES ERROR
        if( ![ 'A', '$' ].includes( usuario.rol.rango ) && ( aspectos.length > 2 || Object.values( imagenes ).length != 0 || Object.values( colores ).length > 5) )
            return res.status( 401 ).json({
                error: true,
                mensaje: 'Debes de ser usuario Premium para acceder a imaganes, más de dos aspectos y más de cinco colores'
            });

        try{
            const calendario = new Calendario( { nombre, colores, imagenes, aspectos, usuario, fecha, ano: fecha.getFullYear() } );
            calendario.save();
            return res.json({
                error: false,
                mensaje: 'Calendario creado con éxito',
                calendario
            });
        }catch( err ){
            return res.status(500).json({
                error: true,
                mensaje: 'No se pudo crear este calendario'
            });
        }
    },
    async updateCalendario( req= request, res = response ){
        const { ano, usuario, fecha, estado, ...data } = req.body;
        const { id } = req.params;
        try{
            const calendario = await Calendario.findByIdAndUpdate( id, data, { new: true } );
            return res.json({ 
                error: false, 
                mensaje: 'Calendario actualizado con éxito',
                calendario
             });
        }catch( err ){
            return res.status( 500 ).json({
                error: true, 
                mensaje: 'No se ha podido actualizar el calendario'
            })
        }
    },
    async deleteCalendario( req= request, res = response ){
        const { id } = req.params;
        try{
            const calendario = await Calendario.findByIdAndUpdate( id, { estado: false } );
            return res.json({ 
                error: false, 
                mensaje: 'Calendario eliminado con éxito',
                calendario
             });
        }catch( err ){
            return res.status( 500 ).json({
                error: true, 
                mensaje: 'No se ha podido eliminar el calendario'
            })
        }
    },
}
