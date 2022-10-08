const mongoose = require('mongoose');  

var ProfileSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address:{
        type:String,
    },

},{
    timestamps: true
});


//Export the model
const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
