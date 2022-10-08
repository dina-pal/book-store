const { homePage, resetPassword, loginPage, registerPage } = require('../controllers/PageController');
const { registerPost, verfifyUser, loginPost, logOutUser } = require('../controllers/UserController');

const router = require('express').Router();

router.get('/:path?', homePage);

// Register page 
router.get('/register', registerPage);
router.post('/register', registerPost);

// Login page 
router.get('/login', loginPage );
router.post('/login', loginPost);

// Reset Password page
router.get('/reset-password', resetPassword);
// Reset Password page 
router.get('/verify',  verfifyUser);

// Logout route

router.get('/logout', logOutUser);


module.exports = router;