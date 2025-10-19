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
    name: "Pro Vitality",
    price: 76.74,
    category: "Immunity",
    img: "1000073301-min.jpg",
    desc: "Boost your immune system with Pro Vitality."
  },
  {
    name: "PhytoDefence",
    price: 87.65,
    category: "Defense",
    img: "1000073300-min.jpg",
    desc: "Daily phytonutrient protection with the power of phyto"
  },
  {
    name: "NeoLifeTea",
    price: 53.39,
    category: "Fat and weight",
    img: "1000073299-min.jpg",
    desc: "An energising herbal tea blend for a delicious and refreshing boost of energy."
  },
  {
    name: "Formula IV Plus",
    price: 52.93,
    category: "Joint Support",
    img: "1000073298-min.jpg",
    desc: "Formula IV with additional mineral support and 50% more Tre-en-en®"
  },
  {
    name: "Tre-en-en",
    price: 35.72,
    category: "General Health",
    img: "1000073302-min.jpg",
    desc: "Whole grain concentrates provide cellular nutrition for energy and vitality"
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
    
