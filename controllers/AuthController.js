const User = require('../models/User');

/**
 * Get User against current user id.
 * @param {string} id Take Current User Id
 * @returns {object} Return user object with name, email, userrole data
 */
const getUserInfo = async (id) => {
    const user = await User.findOne({_id: id}).select('name email role -_id');
    return user;

}

module.exports.myAccount = async (req, res) =>{
    const userId = res.locals.userId;
    const user = await getUserInfo(userId);
    const pageName = req.url.replace('/dashboard', '') || 'dashboard'.replace('/', '')

   const makeTitle = (string) =>{
        let stripStr = string.replace('/', '')
       return stripStr.charAt(0).toUpperCase() + stripStr.slice(1);


    }

    res.render('auth/index', {
        user,
        page: req.url.replace('/dashboard', '') || 'dashboard',
        title: `${user.name} ${makeTitle(pageName)} Book Store` || 'My Account', 
        nav:{
            'Dashboard': 'dashboard/home',
            'Orders': 'dashboard/orders',
            'Profile': 'dashboard/profile',
            'Watch List': 'dashboard/watchlist',
            'Edit Account': 'dashboard/edit-account',
        }
    })

}


