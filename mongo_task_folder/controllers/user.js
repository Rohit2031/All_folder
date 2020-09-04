// init code 
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
//below we export the the model user file (./.. for directory change upper level )
const User = require('./../models/user');

// Middlware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// deafult routes goes here we create rule http method all (like get post del put ) 
router.all(
    '/',
    function (req, res) {
        return res.json({
            status: true,
            message: 'User controlling working by rohit..'
        })
    }
);

// create new user routes
router.post(
    '/createNew',
    [
        // here validation and sanitization start check not empty fields and validator provide true values  
        check('username').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail()
    ],
    function (req, res) {
        //check validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: 'form validation error by rohit',
                errors: errors.array()
            });
        }


        // hash [assword codeing here

        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        // create new user model with using save function to insert the data

        var temp = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });

        // insert data into database
        temp.save(function (error, result) {
            // check error
            if (error) {
                return res.json({
                    status: false,
                    message: 'DB Insert Failed ...pls check rohit',
                    error: error
                });
            }
            // if everything is OK 
            return res.json({
                status: true,
                message: 'DB Inserted great..',
                result: result
            });
        });


    }
);

// find user documents route and how to read the database data
router.get(
    '/find',
    function (req, res) {
        // find the user document
        User.find(function (error, result) {
            // check error
            if (error) {
                return res.json({
                    status: false,
                    message: 'DB Find fail..pls check rohit',
                    error: error
                });
            }
            //everything is OK 
            return res.json({
                status: true,
                message: 'grate ypu find them ..',
                result: result
            });
        });
    }
);

// update user documents
router.put(
    '/update/:email',
    function (req, res) {
        // check email is empty or not validation 
        if (req.params.email) {

            // use User model here
            User.update(
                // here we write the condition which filed has been matched for updation 
                { email: req.params.email },
                { username: 'Sunil' },
                function (error, result) {
                    //check error
                    if (error) {
                        // return res.status(500).json or we can use return res.send('messsgae)
                        return res.json({
                            status: false,
                            message: 'Data not updated ..pls check rohit',
                            error: error
                        });
                    }
                    // if everything is OK
                    return res.json({
                        status: true,
                        message: 'great DB has been updated ',
                        result: result
                    });
                }
            );

        }else{
            return res.json({
                status: false,
                message:'Email not provide '
            });
        }

    }
);
// remove user data or delete 
router.delete(
    '/delete/:email',
    function(req,res){
        // check if email is empty 
        if (req.params.email){
            User.remove(
                { email: req.params.email},
                function(error,result){
                    // check wheater is error
                    if(error){
                        return res.json({
                            status:false,
                            message:'DB Delete fail..pls check rohit',
                            error:error
                        });
                    }
                    // if everything is Ok 
                    return res.json({
                        status:true,
                        message:'Data has been delete great work ',
                        result: result
                    });
                }
            );
        }else{
            return res.json({
                status:false,
                message:'Email not provide pls provide '
            });
        }

    }

);

// module exports
module.exports = router;



// output data for user 
    //     return res.json({
    //         status : true,
    //         message : 'User data OK..by rohit ',
    //         data : req.body,
    //         hashedPassword : hashPassword 
    //     });


    //data insert useing create function 
    // insert data in model here value set on schema
    // User.create(
    //     {
    //     username : req.body.username,
    //     email : req.body.email,
    //     password: hashPassword
    // }, 
    // return res.status(500).json()
    //  function(error,result){
        // check error and error store in error param and result store result parm
        // if(error){
        //     return res.json({
        //         status: false,
        //         message:'DB Insert fail..by rohit',
        //         error : error
        //     });
        // }
        //if everything is ok 
    //     return res.json({
    //         status: true,
    //         message:'Everything is ok Data Insert ',
    //         result:result
    //     });
    // }
    // );
