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
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public', 'views', 'img')));
app.get('/style.css', (req, res) => {
  res.header('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'public','views', 'style.css'));
});
app.get('/script.js', (req, res) => {
  res.header('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public','views', 'script.js'));
});
app.get('/products.json', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'public','views', 'products.json'));
});
app.get('/success.html', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'public','views', 'success.html'));
});
app.get('/cancel.html', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'public','views', 'cancel.html'));
});
app.use(router);
app.listen(process.env.PORT_NUMBER,()=>{console.log("server started")})
