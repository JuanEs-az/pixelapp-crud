//Implementación de Dotenv
require('dotenv').config();

//Importe y ejecución del servidor
const { PixelServer } = require('./models');
const servidor = new PixelServer();

servidor.listen();