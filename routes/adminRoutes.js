const { adminPage } = require('../controllers/AdminController');

const router = require('express').Router();

router.get('/', (req, res) =>{
    res.redirect('/admin/home');
});
router.get('/:path?', adminPage);


module.exports = router;