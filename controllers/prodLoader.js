const express = require('express');
const { productlistmodel, usercartitemsmodel,checkoutformcashmodel} = require('../models/authmodel.js');
const ejs = require('ejs');
let app = express();
const path = require('path');
let mail=require('nodemailer')
require('dotenv').config();
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
exports.productloader=async (req,res,lname="Unauthorized",lemail='')=>{
    let prodlist =await productlistmodel.findOne({})
    if(prodlist){
        productlist=JSON.parse(prodlist.productlist)
        ejs.renderFile('public/views/product.ejs',{loginname:lname,loginemail:lemail,prodlist:productlist},(err,str)=>{
            if(err){
                console.log(err)
            }
            else{
                res.send(str);
            }
        })
    }
}

exports.items=async ()=>{
    let productlist;
    let prodlist =await productlistmodel.findOne({})
    if(prodlist){
        productlist=await JSON.parse(prodlist.productlist)
    }    
    return productlist
}

exports.checkoutformcash=async(req,res)=>{
    let action=req.body.action;
    console.log(req.body)
    if(action=="cash"){
      const {
        username,
        phonenumber,
        address,
        email,
        paymentmode,
        cartitem,
      } = req.body;
  
      const neworder = new checkoutformcashmodel({
        username: username || undefined,
        phonenumber: phonenumber || undefined,
        address: address || undefined,
        email: email || undefined,
        paymentmode: paymentmode || undefined,
        cartitem: cartitem || undefined,
        action: action || undefined,
      });
  
      await neworder.save().then((response)=>{
          console.log(response)
          let nodemail=mail.createTransport({
            service:'gmail',
            auth:{
              user:process.env.GMAIL_ID,
              pass:process.env.GMAIL_PASSWORD
            }
          })
          let mailbody={
            from:process.env.GMAIL_ID,
            to:req.body.email,
            subject:'Order Confirmation Details',
            text:`Dear ${req.body.username},
            Thank you for shopping with us! We are thrilled to confirm your recent order.Thank you for choosing us. 
            We look forward to serving you again in the future!
            Best Regards,`
          }
          nodemail.sendMail(mailbody,function(err,data){
            if(err){
              console.log(err)
            }else{
              console.log(data)
            }
          })
          const indexPath = path.join(__dirname,'..', 'public','views', 'success.html');
          res.sendFile(indexPath);
        }).catch((err)=>{
          console.log(err)
          const indexPath = path.join(__dirname,'..', 'public','views', 'success.html');
          res.sendFile(indexPath);
        })
    }else if(action==="card"){
      let itemarr=[];
      let reqitems=JSON.parse(req.body.cartitem)
      reqitems.forEach((item) => {
        let itemobj={
            price_data:{
              currency:'usd',
              product_data:{name:item.name,images:image(reqitems)},
              unit_amount:Number(item.price)*100,
            },
            
            quantity:Number(item.quantity)
        }
        console.log(itemobj)
        itemarr.push(itemobj)
function image(reqitems){
  let imgarr=[];
  reqitems.forEach((e)=>{imgarr.push(e.image)})
  return imgarr
}
});
       let nodemail=mail.createTransport({
        service:'gmail',
        auth:{
          user:process.env.GMAIL_ID,
          pass:process.env.GMAIL_PASSWORD
        }
      })
      let mailbody={
        from:process.env.GMAIL_ID,
        to:req.body.email,
        subject:'Order Confirmation Details',
        text:`Dear ${req.body.username},
        Thank you for shopping with us! We are thrilled to confirm your recent order.Thank you for choosing us. 
        We look forward to serving you again in the future!
        Best Regards,`
      }
      nodemail.sendMail(mailbody,function(err,data){
        if(err){
          console.log(err)
        }else{
          console.log(data)
        }
      })
        const session = await stripe.checkout.sessions.create({
          customer_email:req.body.email,          
            line_items:itemarr,
            payment_method_types:['card'],
            mode: 'payment',
            success_url: 'https://ecommercefashion-9766.onrender.com/success.html',
            cancel_url: 'https://ecommercefashion-9766.onrender.com/cancel.html',
          }); 
  res.redirect(303, session.url);
}

}
exports.adminpage=async(req,res)=>{
  if(req.body.adminemail==process.env.ADMIN_EMAIL && req.body.adminpassword==process.env.ADMIN_PASSWORD){
    let orders=await checkoutformcashmodel.find({})
    let orderarr=[...orders]
    let neworderarr=[]
    let parseitem=(cartitem)=>{
      let parsedarr=JSON.parse(cartitem) 
      if (!Array.isArray(parsedarr)) {
        parsedarr = [parsedarr]
      }
      return parsedarr
    }
    neworderarr= orderarr.map(order => {
      return {
        ...order._doc,
        cartitem: JSON.parse(order.cartitem)
      };
    });
    console.log(neworderarr)
    ejs.renderFile('public/views/admin.ejs',{orders:neworderarr},function (err, str) {
      if (err) {
        console.log(err);
      } else {
        res.send(str)
      }
    });
  }else{
    ejs.renderFile('public/views/adminlogin.ejs',{loginmessage:'Wrong Email or Password'},function (err, str) {
      if (err) {
        console.log(err);
      } else {
        res.send(str)
      }
    });
  }
}
