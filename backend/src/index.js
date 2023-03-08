const express = require('express')
const morgan = require('morgan')
const app=express()
const dotenv=require('dotenv').config()
PORT=process.env.PORT
const user=require('./routes/userRoutes')

//connection to database
require('./dbConnect')

app.use(express.json())
app.use(morgan('dev'))

app.use('/user',user)

//error handling for no route found
app.use((req, res, next) => {
    res.status(404).json({
        error: 'not found',
    });
});

app.listen(PORT, () => console.log(`server listening on ${Number(PORT)}`))