const express = require('express');
const fastestValidator = require('fastest-validator')
const expressSession = require('express-session')
var bodyparser = require('body-parser');
const { default: Validator } = require('fastest-validator');
const v =   new fastestValidator();



const app = express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(expressSession({
    secret:"thisissecretkey",
    saveUninitialized:false,
    resave:false

}))



app.set("view engine","ejs")

app.get('/',(req,res) => {
    res.render("index",{usernameerror:req.session.usernameerror,emailerror:req.session.emailerror,passworderror:req.session.passworderror,success:req.session.success})
//reste the value
    req.session.usernameerror = null
    req.session.passworderror = null
    req.session.emailerror = null
    req.session.success = null

})

const schema = {
    username:{type: "string",min:3, max:100},
    password:{type: "string",min:3, max:100},
    email:{type: "email"}
};

app.post('/',(req,res) =>{
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    const check = v.compile(schema);
    const result = check({
        username:username,
        password:password,
        email:email
    })
    if(result){
        req.session.success = true
        res.redirect('/')
        
    }
    else{
        req.session.usernameerror = result[0].message
        req.session.emailerror = result[1].message
        req.session.passworderror = result[2].message
        req.session.success = false
        res.redirect('/')
       
    }
    console.log(username)
    console.log(password)
    console.log(email)
    console.log(result)
})

app.listen(4000, () => {
    console.log("My App is listening on port 4000")
})