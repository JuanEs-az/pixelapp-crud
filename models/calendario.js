const { Schema, model } = require('mongoose');
const CalendarioSchema = Schema({
    nombre: {
        type: String,
        require: [ true, 'El nombre es obligatorio' ],
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [ true, 'El usuario es obligatorio' ]
    },
    colores: {
        type: Object,
        require: [ true, 'Los colores deben ser especificados ']
    },
    imagenes: Object,
    aspectos: Array,
    ano: {
        type: Number,
        require: [true, 'El año es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    fecha: Date
});

module.exports = model('Calendario', CalendarioSchema);