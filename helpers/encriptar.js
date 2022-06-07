const bcryptjs = require('bcryptjs');
module.exports = {
    encriptar( string ){
        const salt = bcryptjs.genSaltSync();
        return bcryptjs.hashSync( string , salt );
    }
};