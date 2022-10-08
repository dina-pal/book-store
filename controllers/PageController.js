const fs = require('fs');
const path = require('path');

const User = require("../models/User");

// Check if user is already login or not 
const getUserInfo = async (id) => {
    if(id){
        const user = await User.findOne({_id: id}).select('name email role -_id');
        return user;
    }else{
        return false;
    }
};

// const if page exists or not 

const isPageExist = (page) =>{
   return fs.existsSync(path.join(__dirname, `../views/pages/${page}.ejs`));
};

module.exports.homePage = async (req, res) =>{
    const user = await getUserInfo(res.locals.userId) || '';

    if(isPageExist(req.params.path) || (typeof req.params.path === 'undefined') ){
        res.render('index', {
            title: 'Home Page',
            user,
            page: req.url.replace('/', '') || 'home',
            nav:{
                'Home': 'home',
                'Shop': 'shop',
                'Best Seller': 'best-seller',
                'Contact': 'contact',
                'About': 'about'
    
            }
        });
    }else{
        res.render('404', {
            title: 'Error 404',
        }); 
    }
    
};

module.exports.loginPage = (req, res) =>{
    res.render('login', {
        title: "This is Login page",
    });
};
module.exports.registerPage = (req, res) =>{
    res.render('register');
};

module.exports.resetPassword = (req, res) =>{
    res.render('password-reset');
};



// Logout User
module.exports.logOutUser = (req, res) =>{
    const token = req.cookies.jwt_signin;
    console.log(token);
};