const express=require('express') 
const app=express();
const authcontroller=require('../controllers/authcont')
const prodloader=require('../controllers/prodLoader')
const {usercartitemsmodel}=require('../models/authmodel')
const ejs=require('ejs')
const route=express.Router()

route
.get('/', (req, res) => {
    ejs.renderFile('public/views/index.html',function (err, str) {
        if (err) {
            console.log(err);
        } else {
            res.send(str)
        }
        });
})
.get('/register', (req, res) => {
    ejs.renderFile('public/views/register.ejs',{ registermessage: '' },function (err, str) {
        if (err) {
            console.log(err);
        } else {
            res.send(str)
        }
        });
})
.post('/register',authcontroller.createUser)
.get('/login',(req,res)=>{
    ejs.renderFile('public/views/login.ejs',{ loginmessage: '' },function (err, str) {
        if (err) {
            console.log(err);
        } else {
            res.send(str)
        }
        });
})
.get('/checkout',(req,res)=>{
    const { username, email, cartitems } = req.query;
    ejs.renderFile('public/views/checkout.ejs',{username:username,email:email,cartitems:cartitems}, function (err, str) {
        if (err) {
            console.log(err);
        } else {
            res.send(str)
        }
        })
})
.post('/login',authcontroller.loginUser)
.get('/products',authcontroller.products)
.post('/checkoutform',prodloader.checkoutformcash)
.get('/adminlogin',authcontroller.adminlogin)
.post('/admin',prodloader.adminpage)
.get('/success',(req,res)=>{
    ejs.renderFile('public/views/success.html', function (err, str) {
    if (err) {
        console.log(err);
    } else {
        res.send(str)
    }
    })})
.get('/cancel',(req,res)=>{ 
    ejs.renderFile('public/views/cancel.html', function (err, str) {
    if (err) {
        console.log(err);
    } else {
        res.send(str)
    }
    })})
.get('/about',(req,res)=>{ 
        ejs.renderFile('public/views/about.html', function (err, str) {
        if (err) {
            console.log(err);
        } else {
            res.send(str)
        }
        })})    
app.get('/api/items', async (req, res) => {
    const productlist = await prodloader.items();
    res.send(productlist);
})

module.exports=route;
