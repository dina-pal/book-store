const mongoose = require('mongoose');

const db = process.env.MONGODB_URL.replace('<DATABASE>', process.env.DATABASE);

mongoose.connect(db, () =>{
    console.log('database connected');
})