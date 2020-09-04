//init code 
require('dotenv').config();
const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL ;


//connection established 
mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true,

    },
    //error data base error store and link database connetion store
    function(error,link){
        //check error if any 
        assert.equal(error,null,'error shwoing like db connect failed...');

        //ok for every thing
        console.log('DB Connect success...');
        // console.log(link);
    }
);
