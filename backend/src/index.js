const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cron=require('node-cron')
const app = express();
const dotenv = require('dotenv').config({ path: 'src/.env' });
PORT = process.env.PORT;

//importing routes
const user = require('./routes/userRoutes');
const team=require('./routes/teamRoutes')
const chat=require('./routes/chatRoutes')
const message=require('./routes/messageRoutes')

//connection to database
cron.schedule('* * * * * *',function(){
    require('./dbConnect');
})


//formatting data
app.use(cors());
app.use(express.json());

//logging
app.use(morgan('dev'));

//swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('./api.yaml');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

//assigning routes
app.use('/user', user);
app.use('/team',team)
app.use('/message',message)
app.use('/chat',chat)

//error handling for no route found
app.use((req, res, next) => {
    res.status(404).json({
        error: 'not found'
    });
});

const server=app.listen(PORT, () => console.log(`server listening on ${Number(PORT)}`));

const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:3000'
    }
})
io.on('connection',(socket)=>{
    console.log('connected to socket.io')
    socket.on('setup',(userData)=>{
        socket.join(userData._id)
        socket.emit('connected')
    })

    socket.on('join chat',(room)=>{
        socket.join(room)
    })

    socket.on('new message',(newMessage)=>{
        var chat=newMessage.chat
        if(!chat.users)
        return console.log('chat is empty')
        chat.users.forEach(user => {
            if(user._id==newMessage.sender._id)
            return
            socket.in(user._id).emit('message received',newMessage)
        });
    })
    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    })
})
