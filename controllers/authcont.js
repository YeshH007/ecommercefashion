
const express = require('express')
const jwt = require('jsonwebtoken')
const { registermodel, loginmodel } = require('../models/authmodel.js');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
let app = express();
require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const session = require('express-session');
const prodloader=require('../controllers/prodLoader')

app.use(session({
  secret: '123455',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } 
}));
let existingUser = async (req) => {
  const user = await registermodel.findOne({ email: req.body.email });
  return user ? true : false; 
};
let registermessage;
exports.createUser = async (req, res) => {
    let registermessage = '';
    const newuser = new registermodel(req.body)
    newuser.email = req.body.username
    newuser.email = req.body.useremail
    let token = jwt.sign({ body: req.body.useremail },privateKey,{algorithm:"RS256"});
    newuser.token = token;
    const hash = bcrypt.hashSync(req.body.registerpassword, 10);
    newuser.password = hash;
    await newuser.save()
      .then((result) => {
        console.log(req.body)
        console.log(result)
        if (existingUser) {
          registermessage = `${req.body.username} ,Your account is created,please go to the login page`

        }
      }).catch((error) => {
        console.log(`error from ${error}`);
        registermessage = "Unauthorized";
      }).finally(()=>{
      ejs.renderFile('public/views/register.ejs',{registermessage:registermessage
    },function (err, str) {
      if (err) {
        console.log(err);
      } else {
        res.send(str)
        registermessage='';
      }
    });
      })



}
let publickey=process.env.PUBLIC_KEY;
exports.loginUser=async(req,res)=>{
  let loginmessage='';
  const user = await registermodel.findOne({ email: req.body.loginemail }).then(async(result)=>{
  return result;
})
if(user===null){
      loginmessage=`${req.body.loginemail} does not exist,please register`
      ejs.renderFile('public/views/login.ejs',{loginmessage:loginmessage
      },function (err, str) {
        if (err) {
          console.log(err);
        } else {
          res.send(str)
          loginmessage='';
        }
      });
    }else{
      await bcrypt.compare(req.body.loginpassword,user.password).then((result)=>{
        jwt.verify(user.token,publickey,function verifiedfunc(err,val){
          let verified=false;
          if(err){
            console.log(err);
            verified=false;
          }
          else{
            console.log(val);
            verified=true;
            if(result){
              loginmessage=`${user.username},you are logged in`;
              verified=true;
              prodloader.productloader(req,res,user.username,user.email)
            }
            else{
              loginmessage=`${user.username},your password is wrong.`;
              ejs.renderFile('public/views/login.ejs',{loginmessage:loginmessage
              },function (err, str) {
                if (err) {
                  console.log(err);
                } else {
                  res.send(str)
                  loginmessage='';
                }
              });
            }
            console.log(loginmessage);
          }
          return verified;
        }) 
      })
    }
  
}


exports.products=async(req,res)=>{
  prodloader.productloader(req,res,"Unauthorized","Unauthorized")
}
exports.adminlogin=async(req,res)=>{
  ejs.renderFile('public/views/adminlogin.ejs',{loginmessage:''},function (err, str) {
    if (err) {
      console.log(err);
    } else {
      res.send(str)
    }
  });
}

