const express=require('express') 
const bcrypt=require('bcrypt') 
const jwt=require('jsonwebtoken') 
const router=require('./routes/authroute')
const app=express();
const mongoose=require('mongoose')
const path=require('path')
const ejs=require('ejs');
const stripe=require('stripe')
require('dotenv').config();
const session = require('express-session');

app.use(session({
    secret: '123455',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
app.use(express.json())
app.enable('case sensitive routing');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.set('view engine','ejs');
let stripegateway=stripe(process.env.STRIPE_SECRET_KEY)
mongoose.connect('mongodb+srv://yash:123@cluster0.dw6uqtt.mongodb.net/')
.then((res)=>{
    console.log("connected");
})
.catch((err)=>{console.log(err)})
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public'));
app.use(router);
app.listen(process.env.PORT_NUMBER,()=>{console.log("server started")})
