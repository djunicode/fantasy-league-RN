const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: 'src/.env' });
const url = process.env.MONGODB_URL;
//connecting to database
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connection Succesful');
    })
    .catch((err) => console.log('no connection'));