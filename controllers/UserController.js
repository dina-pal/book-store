const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const { handleUserError } = require('../errors/handleError');
const Token = require('../models/Token');
const User = require('../models/User');
const { signupMail } = require('../service/Email/Nodemailer');


// Important Constant

/**
 * Max age in Day.
 */
const maxAge = 60*60*24;


// Manage Token for registerd user
/**
 * Manage User Token, And send email to user.
 * @param {Object} user Get Current user 
 * @returns {Object} it's return sended mail info. 
 */
const manageUserToken = async (user) =>{
    let genToken = crypto.SHA256(user.id);
    let name = user.name;
    let email = user.email;
    const isAlreadyToken = await Token.findOne({userId: user.id});

    if(isAlreadyToken){
        genToken = isAlreadyToken.token;
        name = isAlreadyToken.name;
        email = isAlreadyToken.email;
    }else{
    await Token.create({userId: user.id, token:genToken });
    }

    const url = `http://127.0.0.1:8000/verify/?token=${genToken}&uid=${user.id}`;

    return await signupMail(email, name, url);
    
};


/**
 * Geneate Jwt Token 
 * @param {String} userId Current User Id
 * @returns {String} Jwt Token
 */
const generateLoginToken = (userId) =>{
    const token = jwt.sign(userId, process.env.JWT_SECRET);
    return token;
};


// Register Email Account
module.exports.registerPost = async (req, res) =>{
    const {name, email, password} = req.body;
    try {
        const notVerfiedUser = await User.findOne({email:email, isActive: false});
        if(notVerfiedUser !== null){
            manageUserToken(notVerfiedUser);
            return res.status(400).json({
                success: false,
                message: "you are already reigsterd, Please verify your email address"
            });
        }
        const isVerifyed = await User.findOne({email:email, isActive: true});
        if(isVerifyed !== null){
            return res.status(400).json({
                success: false,
                message: "you are already reigsterd, Login now"
            });
        }
        const user = await User.create({name, email, password});
        if(user === null){
            return res.status(500).json({
                success: false,
                message: "something went wrong"
            });
        }
        res.status(201).json({
            success: true,
            message: `User created successfully, please verify your account`, 
        }); 
        manageUserToken(user);

    } catch (error) {
       const err = handleUserError(error);
       console.log(err);
        res.status(500).json({
            success: false,
            message: 'Please Enter Valid User Information',
            error: err
        });
    }
};

// Verify User Email Address
module.exports.verfifyUser = async (req, res) =>{
    const {token, uid} = req.query;
    if(typeof token === 'undefined' || typeof uid === 'undefined'){
        return res.status(404).json({
            success: false,
            message: '404 Page Not Found!'
        });
    }

    try {
        // check if user already verifed 
        const isVerified = await User.findOne({_id: uid, isActive: true});
        if(isVerified == null){
           return res.status(200).json({
                success: false,
                status: false,
                message: 'Your Account is already verifed!'
            }); 
        }

        const deleteToken = await Token.findOneAndRemove({token: token});
        if(deleteToken !== null){
            const user = await User.findOneAndUpdate({id: uid},{$set: {isActive: true}});
            if(user !==null){
                return  res.status(200).json({
                    success: true,
                    status:  false,
                    message: 'Congrulations your account is successfully verified'
                }); 
            }
        }else{
            return  res.status(200).json({
                success: true,
                status:  null,
                message: 'Your account is not verfied, please verify it to continue'
            }); 
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong!'
        });
    }
};

// Login User 

module.exports.loginPost = async (req, res) =>{
    const {email, password, remember} = req.body;
    try {
        const user = await User.findOne({email: email, isActive: true}); 
        if(user === null){
            return res.status(400).json({
                success: false,
                status: 'not-verified',
                message: 'User Not Found, if you already registered. please verify your account.',
            });
        }
        const isUser = await user.comparePassword(email, password);
        if(isUser === true){
            const jwtToken = generateLoginToken(user.id);
            const CookieAge = remember ? maxAge * 30 * 1000 : maxAge * 1000;
            console.log(CookieAge);
            res.cookie('jwt_signin', jwtToken, {httpOnly: true, maxAge: CookieAge});
            res.status(200).json({
                success: true,
                status: 'verified',
                path: res.locals.path
            });
            // Check user type before sending them to any page:

            // if(user.role === 'admin'){
            //     res.status(200).json({
            //         success: true,
            //         status: 'verified',
            //     })
            // }else{
            //     res.status(200).json({
            //         success: true,
            //         status: 'verified',
            //     })
            // }
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong! Plese Check your credintials'
        });
    }

};

