const morgan = require('morgan');
const cors = require('cors');
const dns = require('dns');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const middleware = [
    morgan('dev'),
    cors()
]

// verify user auth 

const authUser = (req, res, next) =>{
    const token = req.cookies.jwt_signin;
    try {
        res.locals.path = req.path;
        if(token){
            const userId =  jwt.verify(token, process.env.JWT_SECRET );
            res.locals.userId = userId;
            next();
        }else{
            return res.status(202).render('login')
        }
    } catch (error) {
        console.log(error);
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        }); 
        
    }
}

const isUserLoggedIn = (req, res, next) =>{
    const token = req.cookies.jwt_signin;
        if(token){
            const userId =  jwt.verify(token, process.env.JWT_SECRET );
            res.locals.userId = userId;
            next();
        }else{
            next();
        }

}


const isOnline = (req, res, next) =>{
    function isInternetOnline(callback) {
        dns.lookup('google.com', function (error) {
            if (error && error.code == "ENOTFOUND") {
                callback(false);
            } else {
                callback(true);
            }
        })
    }
    
    
    isInternetOnline(function (isInternet) {
        if (!isInternet) {
            return res.render('nointernet');
        }else{
            next();
        } 
    }); 
}

const authPath = (req, res, next) => {
    req.active = req.path.split('/')[1] 
    next();
}

const checkAdmin = async (req, res, next) =>{
    const id = res.locals.userId;
    const user = await User.findById(id, 'role -_id').exec();
    if(user.role === 'admin'){
        next();
    }else{
        res.send('You are not authorized for access the page!')
    }

    
}

module.exports = { middleware, isOnline, authUser, authPath, isUserLoggedIn, checkAdmin}