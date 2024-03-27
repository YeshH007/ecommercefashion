const mongooose=require('mongoose');
let usersregisterschema=mongooose.Schema({
    username:{type:String,required:true},
    email:{
        type:String,
        unique:true,
        required:true,
        validate:{
            validator:function(v){
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
           }
        }
    }
    ,password:{type:String,required:true,minLength:6},
    token:{type:String},
    cartitems:{}
})

let usersloginschema=mongooose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(v){
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
           }
        }
    }
    ,password:{type:String,required:true,minLength:6},
    token:{type:String},
    cartitems:{}
})
let productlist=mongooose.Schema({
    productlist:{type:String}
})
let usercartitems=mongooose.Schema({
    useremail:{type:String},
    cartitems:{type:String}
})
let checkoutformcash=mongooose.Schema({
    phonenumber:{type:String},
    address:{type:String},
    cartitem:{type:String},
    username:{type:String},
    email:{type:String},
    paymentmode:{type:String},
    action: { type: String } 
})
const registermodel=mongooose.model('registeruser',usersregisterschema,'registered');
const loginmodel=mongooose.model('loginuser',usersloginschema,'loggedin');
const productlistmodel=mongooose.model('productslist',productlist,'productslist');
const usercartitemsmodel=mongooose.model('usercartitems',usercartitems,'usercartitems');
const checkoutformcashmodel=mongooose.model('checkoutformcash',checkoutformcash,'checkoutformcash');

module.exports = {
    registermodel,
    loginmodel,
    productlistmodel,
    usercartitemsmodel,
    checkoutformcashmodel
};


