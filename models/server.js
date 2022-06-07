//Requerimos el Paquete de Express y el Puerto para ejectuar el servidor
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
class PixelServer{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.endpoints = {
            'auth': '/auth',
            'calendario': '/calendario',
            'dia': '/dia',
            'rol': '/rol',
            'usuario': '/usuario',
        }
        this.setServer();
        this.setRutas();
    }
    listen(){
        //Método de configuración de rutas    
        this.app.listen( this.port, () => console.log( `Listening on Port ${ this.port }` ));   
    }
    setServer(){
        this.DBConnect(); //Conectamos con la base de datos
        this.app.use( cors() ); 
        this.app.use( express.json() ); 
    }
    setRutas(){
        this.app.use( this.endpoints.auth, require('../routes/auth') )
        this.app.use( this.endpoints.calendario, require('../routes/calendario') );
        this.app.use( this.endpoints.dia, require('../routes/dia') );
        this.app.use( this.endpoints.rol, require('../routes/rol') )
        this.app.use( this.endpoints.usuario, require('../routes/usuario') );
    }
    async DBConnect(){
        try{
            mongoose.connect( process.env.MONGO_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true
              } );
            console.log('DB Online');
            return
        }catch{
            throw new Error('DB went off');
        }
    }
}
module.exports = PixelServer;