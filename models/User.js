const mongoose = require('mongoose');  
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    email:{
        type:String,
        required:[true, 'Email address is required'],
        unique:true,
        validate: [isEmail, 'Please Enter a valid email address']
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minlength: [6, 'minimun 6 character is required']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// check login 

userSchema.methods.comparePassword = async function(email, password){

    if(email !== this.email){
        return new Error('Please Enter a valid Email address');
    }

    const isPassword = await bcrypt.compare(password, this.password);
    
    if(isPassword === true){
        return isPassword;
    }
};

//Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
