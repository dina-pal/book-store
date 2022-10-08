const { myAccount } = require('../controllers/AuthController');

const router = require('express').Router();

router.route('/dashboard/:path?').get(myAccount)


module.exports = router;