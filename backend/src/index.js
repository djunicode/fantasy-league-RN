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

//error handling for no route found
app.use((req, res, next) => {
    res.status(404).json({
        error: 'not found'
    });
});

app.listen(PORT, () => console.log(`server listening on ${Number(PORT)}`));
