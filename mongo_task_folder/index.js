// Init code to import or require here
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const dbfile = require('./database'); 
const userController = require('./controllers/user');


// middleware setup
//dev means development mode log wil be provide 
app.use(morgan('dev'));
app.use(cors());
app.use('/api/user',userController);


//default Routes
//all function used handle all post get and any request 
app.all(
    '/',
    function(req,res){
        return res.json({
            status : true,
            message : 'this is correct way to working ...'
        });
    }
);

//server start here we define the function if you can you can mentioned port number only 
app.listen(
    port,
    function(){
        console.log('server running on this port: ', + port);
    }

);
