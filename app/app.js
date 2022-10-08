const express = require('express');
const cookieParser = require('cookie-parser');
const {middleware,  authUser, authPath, isUserLoggedIn, checkAdmin } = require('../middleware/middleware');
require('../config/database');
const app = express();


app.set('view engine', 'ejs');

// Static Folder Set
app.use(express.static('public'));


// Middleware
app.use(express.json())
app.use(cookieParser());
app.use(middleware)


// Public Routes 
app.use('/', isUserLoggedIn, require('../routes/routes'));

// Private Routes 
app.use('/', authUser, authPath,  require('../routes/authRoutes'));


app.use('/admin/', checkAdmin, require('../routes/adminRoutes'));

// API Routes
app.use('/api/v1/', require('../routes/apiRoutes'));

module.exports = app;