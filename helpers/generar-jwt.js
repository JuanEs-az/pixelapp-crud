const jwt = require('jsonwebtoken');
const generarJWT = ( payload ) => new Promise( ( resolve, reject ) => {
    jwt.sign( payload, process.env.JWT_KEY, { expiresIn: '4h' }, ( err, token ) => {
        if( err || !token ){
            reject({ error: true, mensaje: 'Error al generar el JWT' });
        }else{
            resolve({ error: false, mensaje: 'JWT creado con éxito', token });
        }
    } );
} );
module.exports = {
    generarJWT
};