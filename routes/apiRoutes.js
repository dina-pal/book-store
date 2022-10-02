const router = require('express').Router();

router.route('/', (req, res) =>{
    res.send('working properly')
})

module.exports = router;