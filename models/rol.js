const { Schema, model } = require('mongoose');
const RolSchema = Schema({
    nombre: {
        type: String,
        require: [true, "El nombre del rol es obligatorio"]
    },
    rango: {
        type: String,
        require: [true, "El rango es obligatorio"]
    },
    color: {
        type: String,
        require: [true, "El color es obligatorio"]
    },
    fecha: Date
});
RolSchema.methods.toJSON = function(){
    const { __v, ...rol } = this.toObject();
    return rol;
}
module.exports = model('Rol', RolSchema);   