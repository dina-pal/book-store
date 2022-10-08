verifyuserAccount(user);


// Generate Token for that user
const token = await Token.create({
    userId: user.id,
    token: generateToken(user.id),
})
// Send User verification email
if(token){
    const url = `http://127.0.0.1:8000/verify/?token=${token.token}&uid=${user.id}`;
    signupMail(user.email, user.name, url)
    .then(info =>{
        console.log(info);
    })
    .catch(err =>{
        console.log(err);
        res.status(201).json({
            success: true,
            message: `your account is created successfully, but not send email. please resend activation email and activate your account.`, 
        })
    })
}