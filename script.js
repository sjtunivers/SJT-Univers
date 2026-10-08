const products = [
  {
    name: "Royal Black Shirt",
    cat: "Men",
    price: 799,
    old: 1299,
    icon: "👔"
  },
  {
    name: "Classic Shirt & Pant Combo",
    cat: "Combo",
    price: 999,
    old: 1599,
    icon: "👕"
  },
  {
    name: "Tail Printed Kurti",
    cat: "Women",
    price: 699,
    old: 999,
    icon: "👗"
  },
  {
    name: "Premium Women's Set",
    cat: "Women",
    price: 899,
    old: 1399,
    icon: "👚"
  },
  {
    name: "Black Casual Shirt",
    cat: "Men",
    price: 649,
    old: 999,
    icon: "👔"
  },
  {
    name: "Festive Combo Set",
    cat: "Combo",
    price: 1499,
    old: 2199,
    icon: "✨"
  },
  {
    name: "Elegant Women's Kurti",
    cat: "Women",
    price: 749,
    old: 1099,
    icon: "👗"
  },
  {
    name: "Golden Edition Shirt",
    cat: "Men",
    price: 899,
    old: 1399,
    icon: "👕"
  }
];

let cart = [];
let filter = "All";

function renderProducts() {
  const box = document.getElementById("products");
  const searchBox = document.getElementById("search");

  if (!box) return;

  const search = searchBox
    ? searchBox.value.toLowerCase().trim()
    : "";

  let list = products.filter(p => {
    const categoryMatch =
      filter === "All" || p.cat === filter;

    const searchMatch =
      p.name.toLowerCase().includes(search) ||
      p.cat.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  if (list.length === 0) {
    box.innerHTML =
      '<div class="empty">😔 No products found</div>';
    return;
  }

  box.innerHTML = list.map((p, i) => `
    <div class="product">
      <div class="productImage">${p.icon}</div>

      <div class="productInfo">
        <h3>${p.name}</h3>
        <p class="category">${p.cat}</p>

        <div class="price">
          ₹${p.price}
          <del>₹${p.old}</del>
        </div>

        <p class="discount">
          ${Math.round((1 - p.price / p.old) * 100)}% OFF
        </p>

        <button
          class="goldBtn"
          onclick="addToCart(${products.indexOf(p)})">
          🛒 Add to Cart
        </button>
      </div>
    </div>
  `).join("");
}

function filterProducts(category) {
  filter = category;
  renderProducts();
}

function addToCart(index) {
  cart.push(products[index]);
  updateCart();

  alert("✅ Product added to cart!");
}

function updateCart() {
  const count = document.getElementById("cartCount");

  if (count) {
    count.innerText = cart.length;
  }
}

function openCart() {
  const modal = document.getElementById("cartModal");
  const items = document.getElementById("cartItems");
  const total = document.getElementById("total");

  if (!modal || !items) return;

  modal.classList.add("show");

  if (cart.length === 0) {
    items.innerHTML =
      '<div class="empty">Your cart is empty 🛒</div>';

    if (total) total.innerText = "0";
    return;
  }

  items.innerHTML = cart.map((p, i) => `
    <div class="cartItem">
      <span>${p.icon} ${p.name}</span>
      <b>₹${p.price}</b>
      <button onclick="removeFromCart(${i})">✕</button>
    </div>
  `).join("");

  const sum = cart.reduce(
    (total, product) => total + product.price,
    0
  );

  if (total) total.innerText = sum;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  openCart();
}

function closeCart(event) {
  if (
    !event ||
    event.target.id === "cartModal"
  ) {
    const modal = document.getElementById("cartModal");

    if (modal) {
      modal.classList.remove("show");
    }
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }

  const total = cart.reduce(
    (sum, p) => sum + p.price,
    0
  );

  alert(
    "🎉 Order Ready!\n\n" +
    "Items: " + cart.length +
    "\nTotal: ₹" + total +
    "\n\nCheckout system will be connected next."
  );
}

function toggleMenu() {
  const nav = document.getElementById("nav");

  if (nav) {
    nav.classList.toggle("open");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");

  if (search) {
    search.addEventListener("input", renderProducts);
  }

  renderProducts();
  updateCart();
});
