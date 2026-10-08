const products=[
{name:"Royal Black Shirt",cat:"Men",price:799,old:1299,icon:"👔"},
{name:"Classic Shirt & Pant Combo",cat:"Combo",price:1199,old:1899,icon:"🧥"},
{name:"Taj Printed Kurti",cat:"Women",price:699,old:999,icon:"👗"},
{name:"Premium Women's Set",cat:"Women",price:899,old:1399,icon:"🥻"},
{name:"Black Casual Shirt",cat:"Men",price:649,old:999,icon:"👕"},
{name:"Festive Combo Set",cat:"Combo",price:1499,old:2199,icon:"🛍️"},
{name:"Elegant Women's Kurti",cat:"Women",price:749,old:1099,icon:"👗"},
{name:"Golden Edition Shirt",cat:"Men",price:899,old:1399,icon:"👔"}];
let filter="All",cart=[];
function renderProducts(){let q=(document.getElementById("search").value||"").toLowerCase();let list=products.filter(p=>(filter==="All"||p.cat===filter)&&p.name.toLowerCase().includes(q));document.getElementById("products").innerHTML=list.map((p,i)=>`<article class="product"><div class="pic">${p.icon}</div><div class="info"><span class="tag">${p.cat.toUpperCase()}</span><h3>${p.name}</h3><span class="price">₹${p.price}</span><span class="old">₹${p.old}</span><button class="add" onclick="add(${products.indexOf(p)})">ADD TO CART</button></div></article>`).join("")}
function filterProducts(x){filter=x;document.getElementById("shop").scrollIntoView();renderProducts()}
function add(i){cart.push(products[i]);document.getElementById("cartCount").textContent=cart.length}
function openCart(){document.getElementById("cartModal").classList.add("show");let html=cart.length?cart.map((p,i)=>`<div class="cartItem"><span>${p.name}</span><b>₹${p.price}</b></div>`).join(""):"<p>Your cart is empty.</p>";document.getElementById("cartItems").innerHTML=html;document.getElementById("total").textContent=cart.reduce((s,p)=>s+p.price,0)}
function closeCart(e){if(!e||e.target.id==="cartModal")document.getElementById("cartModal").classList.remove("show")}
function checkout(){if(!cart.length)return alert("Cart is empty.");alert("Demo order ready! Connect your payment/order backend to receive real orders.");}
function toggleMenu(){document.getElementById("nav").classList.toggle("open")}
renderProducts();