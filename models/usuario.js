const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    email:{
        type: String,
        require: [true, "El email es obligatorio"],
        unique: true
    }, 
    contrasena: {
        type: String,
        require: [true, "La contraseña es obligatoria"]
    },
    nombre: {
        type: String,
        require: [true, "El nombre es obligatorio"]
    },
    rol:{
        type: Schema.ObjectId,
        ref: 'Rol',
        require: [true, "El rol es obligatorio"]
    },
    google: {
        type: Boolean,
        default: false
    },
    estado:{
        type: Boolean,
        default: true
    },
    img: String,
    fecha: Date
});
UsuarioSchema.methods.toJSON = function(){
    const { __v, contrasena, ...usuario } = this.toObject();
    return usuario;
}
module.exports = model('Usuario', UsuarioSchema);