

module.exports.adminPage = (req, res) => {
    res.render('admin/index', {
        title: 'Dashboard',
        page: req.url.replace('/home', '') || 'home',
        nav:{
            'Dashboard': 'home',
            'Books': 'books',
            'Add Book': 'add-book',
            'Users': 'user',
        }
    })
   }