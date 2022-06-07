const { Router } = require('express');
const router = Router();

//Middlewares generales
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

//Controladores
const { login } = require('../controllers/auth');

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;