const crypto = require('crypto-js');


module.exports.generateToken = (id) =>{
    return crypto.SHA512(id).toString();
}