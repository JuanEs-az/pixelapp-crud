const { Router } = require('express');
const router = Router();
//Middlewares
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT, validarUsuario } = require('../middlewares/validar-jwt');
const { getCalendarios, getCalendario, createCalendario, updateCalendario, deleteCalendario } = require('../controllers/calendario');
//Controllers

router.get('/', getCalendarios);
router.get('/:id',[
    check('id', 'El id del calendario no es válido').isMongoId(),
    validarCampos
], getCalendario);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('colores', 'Los colores son obligatorios').not().isEmpty(),
    validarCampos
], createCalendario)

router.put('/:id', [
    validarJWT,
    check('id', 'El id del calendario no es válido').isMongoId(),
    validarUsuario({
        metodo: 'RangoOCreador',
        modelo: "C"
    }),
    validarCampos
], updateCalendario);
router.delete('/:id', [
    validarJWT,
    check('id', 'El id del calendario no es válido').isMongoId(),
    validarUsuario({
        metodo: 'RangoOCreador',
        modelo: "C"
    }),
    validarCampos
], deleteCalendario);
module.exports = router;