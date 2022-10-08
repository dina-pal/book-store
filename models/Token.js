const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    token:{
        type: String
    },
    expireAt:{
        type: Date,
        default: Date.now(),
    }
})

const Token = mongoose.model('tokens', TokenSchema);

module.exports = Token;