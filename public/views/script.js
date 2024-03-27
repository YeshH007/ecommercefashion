if (typeof document !== 'undefined') {
 let cartbutton = document.getElementById("cartbutton");
 let closebutton = document.querySelector(".close");
 let sidebar = document.querySelector(".sidebar");
 let productcards = document.getElementsByClassName("productcard")
 let productname = document.getElementsByClassName("productname")
 let productprice = document.getElementsByClassName("productprice")
 let productimage = document.getElementsByClassName("productimage")
 let add = document.querySelectorAll(".productadd")
 let cartcontainer = document.querySelector(".cartitems")
 let cartitemcard = document.getElementsByClassName("cartitemcard")
 let cartitemprice = document.getElementsByClassName("cartitemprice")
 let cartitemimage = document.getElementsByClassName("cartitemimage")
 let cartitemname = document.getElementsByClassName("cartitemname")

 let cartitemquant = document.getElementsByClassName("quantity")
 let totalpricediv = document.querySelector(".totalprice")
 let plus = document.getElementsByClassName("plus")
 let minus = document.getElementsByClassName("minus")
 let searchbar = document.querySelector("#search")
if(cartcontainer && totalpricediv){
  cartcontainer.innerHTML = localStorage.getItem("cartitem")
  totalpricediv.innerHTML = localStorage.getItem("cartitemprice")
}
 let categoryitems = document.querySelectorAll(".categorieitems")
 let under = document.querySelector(".under")
 let itemprice = document.querySelectorAll(".productprice")
 let moreinfo = document.querySelectorAll(".moreinfo")
 let pricerange = document.querySelector("#range")
 let checkout = document.querySelector("#checkout")
 const useremail=document.getElementsByClassName('loginemail')
 const username=document.getElementsByClassName('loginname')
 let checkoutcash=document.querySelector("#checkoutpaymentmodecash")
 let checkoutcard=document.querySelector("#checkoutpaymentmodecard")
 let successproductsbutton=document.getElementById("backtoproducts")
 let cancelproductsbutton=document.getElementById("cancelbacktoproducts")
if(successproductsbutton){
  successproductsbutton.addEventListener('click',()=>{
    window.history.go(-2)
  })
}
if(cancelproductsbutton){
  cancelproductsbutton.addEventListener('click',()=>{
    window.history.go(-3)
  })
}
 let checkoutsubmit=document.querySelector("#checkoutsubmit")
 let stripecheckout=document.querySelector("#stripepayment")

  cartbutton.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.style.right = "0px";
  sidebar.style.display = "flex";
  document.body.style.overflowY = "hidden";
  sidebar.style.overflowY = "hidden";
  sidebar.style.position = "fixed";
  localStorage.setItem("cartitem", cartcontainer.innerHTML)
  localStorage.setItem("cartitemprice", totalprice())
  
});

closebutton.addEventListener("click", (e) => {
  e.preventDefault();
  sidebar.style.right = "-390px";
  sidebar.style.display = "none";
  document.querySelector("*").style.overflowY = "auto";
  localStorage.setItem("cartitem", cartcontainer.innerHTML)
  localStorage.setItem("cartitemprice", totalprice())
  
});
let userdropdownbutton= document.getElementById("user-dropdown-button")
let userdropdowncontent= document.getElementById("user-dropdown-content")

if(userdropdownbutton && userdropdowncontent){
  userdropdownbutton.addEventListener("mouseover",(e)=>{
    userdropdowncontent.style.display='block'
  
  })
  userdropdownbutton.addEventListener("mouseleave",(e)=>{
    userdropdowncontent.style.display='none'
  })
}

document.querySelectorAll(".remove").forEach((e) => {
  e.addEventListener("click", (f) => {
    f.target.parentElement.parentElement.remove()
    localStorage.setItem("cartitem", cartcontainer.innerHTML)
    
  })
})

if(checkout){
  checkout.addEventListener('click',()=>{
    localStorage.setItem("cartitem", cartcontainer.innerHTML)
    // saveitemsLS(useremail,cartcontainer.innerHTML)
  })
}
function cartidcheck() {
  let cartitemids = [];
  for (let i = 0; i < cartitemcard.length; i++) {
    cartitemids.push(cartcontainer.children[i].id)
  }
  return cartitemids
}

function totalprice() {
  let total = 0;
  for (let i = 0; i < cartcontainer.children.length; i++) {
    total += cartitemprice[i].innerHTML * cartitemquant[i].innerHTML
  }
  let totalpriced = `Total Price $ ${Math.trunc(total)}`
  totalpricediv.innerHTML = totalpriced
  return totalpriced
}


function quanteventlist() {
  for (let i = 0; i < plus.length; i++) {
    plus[i].addEventListener("click", (f) => {
      f.target.nextElementSibling.innerHTML = String(Number(f.target.nextElementSibling.innerHTML) + 1)
      totalprice()
      plus[i].removeEventListener()
    })
  }
}

function plusitem() {
  for (let i = 0; i < plus.length; i++) {
    plus[i].addEventListener("click", (f) => {
      f.target.nextElementSibling.innerHTML = Number(f.target.nextElementSibling.innerHTML) + Number(1)
      totalprice()
    })
    plus[i].removeEventListener("click", (f) => {
      f.target.nextElementSibling.innerHTML = Number(f.target.nextElementSibling.innerHTML) + Number(1)
    })
  }
  localStorage.setItem("cartitem", cartcontainer.innerHTML)
  localStorage.setItem("cartitemprice", totalprice())
  
}
function minusitem() {
  for (let i = 0; i < minus.length; i++) {
    minus[i].addEventListener("click", (f) => {
      if (Number(f.target.previousElementSibling.innerHTML) > 1) {
        f.target.previousElementSibling.innerHTML = String(Number(f.target.previousElementSibling.innerHTML) - 1);
        totalprice()
        localStorage.setItem("cartitem", cartcontainer.innerHTML)
        localStorage.setItem("cartitemprice", totalprice())
        
      }
    })
    minus[i].removeEventListener("click", (f) => {
      if (Number(f.target.previousElementSibling.innerHTML) > 1) {
        f.target.previousElementSibling.innerHTML = String(Number(f.target.previousElementSibling.innerHTML) - 1);
        totalprice()
        localStorage.setItem("cartitem", cartcontainer.innerHTML)
        localStorage.setItem("cartitemprice", totalprice())
   
      }
    })
  }
}
plusitem()
minusitem()
add.forEach(element => {
  element.addEventListener("click", async function additems(e){
  
    const response = await fetch('products.json');
    const data = await response.json();
  
    let data_id = e.target.parentElement.parentElement.id
    if (cartidcheck().includes(data_id)) {
      for (let i = 0; i < cartcontainer.children.length; i++) {
        if (cartcontainer.children[i].id === data_id) {
          cartcontainer.children[i].children[2].children[1].innerHTML = String(Number(cartcontainer.children[i].children[2].children[1].innerHTML) + 1)
        };
      }
      
      localStorage.setItem("cartitem", cartcontainer.innerHTML)
      localStorage.setItem("cartitemprice", totalprice())
      
      totalprice()
    }
    else {
      data.forEach(ele => {
        if (ele.id === data_id) {
          cartcontainer.innerHTML += `
            <div class="cartitemcard" id=${ele.id}>
                <img src="${ele.img}" alt="" class="cartitemimage" >
                <div class="cartitemdetails">
                    <p class="cartitemname">${ele.name}</p>
                    <p class="cartitemprice">${Number(ele.price)}</p>
                    <button class="remove">remove</button>
                </div>
                <div class="cartitemquant">
                    <button  class="plus">+</button>
                    <p class="quantity" style="margin: 3px;">1</p>
                    <button  class="minus" >-</button>
                </div>
            </div>
          `
          plusitem()
          minusitem()
          
          localStorage.setItem("cartitem", cartcontainer.innerHTML)
          localStorage.setItem("cartitemprice", totalprice())
          
          totalprice()
        }
      })
    }
    document.querySelectorAll(".remove").forEach((e) => {
      e.addEventListener("click", (f) => {
        f.target.parentElement.parentElement.remove()
        totalprice()
        localStorage.setItem("cartitem", cartcontainer.innerHTML)
        localStorage.setItem("cartitemprice", totalprice())

        totalprice()
      })
    })
  })
})
if(checkout){
    checkout.addEventListener('click',()=>{
      let total=totalprice()
      if(total.slice(14)!=="0"){
        const params = new URLSearchParams();
        params.append('username', username[0].innerText);
        params.append('email', useremail[0].innerText);
        params.append('cartitems', cartcontainer);
        const url = `/checkout?${params.toString()}`;
        window.location.href = url;
      }
  })
}
let prodarr = [...productname]
let debounce = (func, delay) => {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func();
    }, delay);
  }
}
if (searchbar) {
  searchbar.addEventListener('input', debounce((event) => {
    prodarr.forEach((e) => {
      e.parentElement.style.display = 'flex'
    })
    prodarr.forEach((e) => {
      if (!((e.innerHTML).toLowerCase().includes(searchbar.value))) {
        e.parentElement.style.display = 'none'
      }
    })

  }, 1000))
}
categoryitems.forEach((e) => {
  e.addEventListener("click", (event) => {
    prodarr.forEach((e) => {
      e.parentElement.style.display = 'flex'
    })
    if (event.target.id === "all") {
      prodarr.forEach((e) => {
        e.parentElement.style.display = 'flex'
      })
    }
    else {
      prodarr.forEach((e) => {
        if (!((e.innerHTML).includes(event.target.innerHTML))) {
          e.parentElement.style.display = 'none'
        }
      })
    }
  })
})

  if(pricerange && itemprice){
    pricerange.addEventListener("input", (e) => {
      under.innerHTML = `Under $ ${e.target.value}`
      prodarr.forEach((e) => {
        e.parentElement.style.display = 'flex'
      })
      itemprice.forEach((i) => {
        if (!(Number((i.innerHTML)) < Number(e.target.value))) {
          i.parentElement.style.display = 'none'
        }
      })
    })
  }
 
  

    console.log(localStorage.cartitem)
    function checkradio(){
      if(checkoutcash.checked){
        checkoutsubmit.style.display='block';
        checkoutsubmit.innerText="Place Order";
        stripecheckout.style.display='none'
        document.getElementById('addressdiv').style.display='block'
      }
      else if(checkoutcard.checked){
        stripecheckout.style.display='block'
        checkoutsubmit.style.display='none'
        document.getElementById('addressdiv').style.display='none'
      }
}
document.querySelectorAll('.checkoutpayment').forEach(element => {
  element.addEventListener("click",checkradio) 
});
let checkoutsubmitcashform=document.getElementById("checkoutsubmit")
let checkoutsubmitcardform=document.getElementById("stripepayment")
let cartitemshidden=document.getElementById("cartitemshidden")
let emailhidden=document.getElementById("emailhidden")
let usernamehidden=document.getElementById("usernamehidden")

function items(){
  let itemsarray=[];
  for(let i=0;i<cartcontainer.children.length;i++){
    let itemobject={
      name:cartitemname[i].innerText,
      image:cartitemimage[i].src,
      quantity:cartitemquant[i].innerText,
      price:cartitemprice[i].innerText
    }
    itemsarray.push(itemobject)
  }
  const cartItemsValue = JSON.stringify(itemsarray);
  return cartItemsValue
}
function userhidden(){
  let query=window.location.search;
  let params=new URLSearchParams(query);
  const rawUsername = params.get('username');
  const rawEmail = params.get('email');
  const username = rawUsername ? rawUsername.replace('Name: ', '') : '';
  const email = rawEmail ? rawEmail.replace('Email: ', '') : '';
  usernamehidden.value=username;
  emailhidden.value=email;
}
console.log(items())
userhidden()
if(checkoutsubmitcardform){
  checkoutsubmitcashform.addEventListener('click',()=>{
    cartitemshidden.value=items()
    userhidden()
    
 })
 checkoutsubmitcardform.addEventListener('click',()=>{
  cartitemshidden.value=items()
  userhidden()
})
}
}