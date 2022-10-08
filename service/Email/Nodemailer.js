const nodemailer = require('nodemailer');
const { userRegisterMailSend } = require('./Templates/Template');

const transport = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_SERVER,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    secure: true,
});

module.exports.signupMail = (email, name, url ) =>{
    const signupOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email address!',
        html: userRegisterMailSend('Verify Email address', name, url)
    }
    
    return new Promise((resolve, reject) =>{
        transport.sendMail(signupOptions, (err, info) =>{
            if( err) {
                reject(err);
            }
            resolve(info);
        })
    })
}