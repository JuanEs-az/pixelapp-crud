const { Router } = require('express');
const router = Router();
//Middlewares generales
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

//Obtenemos el controlador
const { getRol, getRoles, createRol, updateRol, deleteRol } = require('../controllers/rol');
const { validarJWT, validarUsuario } = require('../middlewares/validar-jwt');

router.get('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    validarCampos
], getRol);

router.get('/', getRoles);

router.post('/', [
    validarJWT,
    validarUsuario(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rango', 'El rango es obligatorio').not().isEmpty(),
    check('color', 'El color es obligatorio').not().isEmpty(),
    validarCampos
], createRol);

router.put('/', [
    validarJWT,
    validarUsuario(),
    validarCampos
], updateRol);

router.delete('/', [
    validarJWT,
    validarUsuario(),
    validarCampos
], deleteRol);
module.exports = router;