// ===== CART LOGIC =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cart-count").innerText = cart.length;

function addToCart(name, price, img) {
  cart.push({ name, price, img });
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cart-count").innerText = cart.length;
  alert(`${name} added to your cart!`);
}

// ===== TESTIMONIAL SLIDER =====
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach(s => s.classList.remove("active"));
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}
setInterval(showSlides, 4000);



















// ===== PRODUCTS DATA =====
const products = [
  {
    name: "Immune Boost Complex",
    price: 35,
    category: "Immunity",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    desc: "Boost your immune system with natural vitamins and minerals."
  },
  {
    name: "Omega-3 Fish Oil",
    price: 25,
    category: "General Health",
    img: "https://images.unsplash.com/photo-1611078489935-0cb964de46f9?auto=format&fit=crop&w=800&q=80",
    desc: "Heart and brain support with purified fish oil."
  },
  {
    name: "Detox & Cleanse Formula",
    price: 30,
    category: "Detox",
    img: "95eb74a1-9f27-4e5b-a2e4-648f3ad58ec3_0_watermark.jpeg",
    desc: "Gently detoxify your system and feel lighter naturally."
  },
  {
    name: "Joint Flex Capsules",
    price: 40,
    category: "Joint Support",
    img: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=800&q=80",
    desc: "Support mobility and flexibility with joint-strengthening herbs."
  },
  {
    name: "Daily Multivitamin",
    price: 22,
    category: "General Health",
    img: "95eb74a1-9f27-4e5b-a2e4-648f3ad58ec3_0_watermark.jpeg",
    desc: "Essential nutrients for everyday energy and wellness."
  },
  {
    name: "Herbal Energy Tonic",
    price: 28,
    category: "Energy",
    img: "95eb74a1-9f27-4e5b-a2e4-648f3ad58ec3_0_watermark.jpeg",
    desc: "Natural herbs that help sustain energy and focus all day."
  }
];

// ===== DISPLAY PRODUCTS =====
const productList = document.getElementById("product-list");
if (productList) displayProducts(products);

function displayProducts(items) {
  productList.innerHTML = "";
  if (items.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  items.forEach(p => {
    const product = document.createElement("div");
    product.classList.add("product");
    product.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p><strong>Category:</strong> ${p.category}</p>
        <p><strong>$${p.price}</strong></p>
        <button onclick="addToCart('${p.name}', ${p.price}, '${p.img}')">Add to Cart</button>
      </div>
    `;
    productList.appendChild(product);
  });
}



// ===== SEARCH + FILTER LOGIC =====
let activeCategory = "all";
const searchBox = document.getElementById("search-box");
const filterButtons = document.querySelectorAll(".filter-btn");

if (filterButtons) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      filterProducts();
    });
  });
}

if (searchBox) {
  searchBox.addEventListener("keyup", filterProducts);
}

function filterProducts() {
  const query = searchBox ? searchBox.value.toLowerCase().trim() : "";
  let filtered = products.filter(p =>
    (activeCategory === "all" || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query))
  );
  displayProducts(filtered);

  // Highlight search text
  if (query.length > 0) {
    document.querySelectorAll(".product-info h3, .product-info p").forEach(el => {
      const text = el.textContent;
      const regex = new RegExp(`(${query})`, "gi");
      el.innerHTML = text.replace(regex, "<mark>$1</mark>");
    });
  }
                 }
    
