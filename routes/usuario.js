const { Router } = require('express');
const router = Router();
//Middlewares generales
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT, validarUsuario } = require('../middlewares/validar-jwt');
//Obtenemos el controlador
const { getUsuario, getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuario');

//Rutas
router.get('/:id',[
    check('id', 'El id del usuario no es válido').isMongoId(),
    validarCampos
], getUsuario); 
router.get('/', getUsuarios);

router.post('/', [
    check('email', 'El email no es válido').isEmail(),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol', 'El rol no es válido').isMongoId(),
    validarCampos
],createUsuario);

//Requieren validar JWT de los headers y empaquetar el id 
router.put('/:id', [
    validarJWT,
    check('id', 'El id del usuario no es válido').isMongoId(),
    validarUsuario({
        metodo: 'RangoOUsuario',
    }),
    validarCampos
], updateUsuario);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id del usuario no es válido').isMongoId(),
    validarUsuario({
        metodo: 'RangoOUsuario',
    }),
    validarCampos
], deleteUsuario);
module.exports = router;