const express = require('express');
require('../config/database');
const app = express();


// Static Folder Set
app.use(express.static('public'));


// Middleware
app.use(express.json())



// Routes 
app.use('/', require('../routes/routes'));

// API Routes
app.use('/api/v1/', require('../routes/apiRoutes'));

module.exports = app;