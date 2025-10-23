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
    name: "Carotenoid Complex",
    price: 49.78,
    category: "Immunity",
    img: "1000073407-min.jpg",
    desc: "Powerful carotenoid nutrients from whole foods to support immunity."
  },
  {
    name: "PhytoDefence",
    price: 87.65,
    category: "immunity",
    img: "1000073300-min.jpg",
    desc: "Daily phytonutrient protection with the power of phyto"
  },
  {
    name: "NeoLifeTea",
    price: 53.39,
    category: "Energy and fitness",
    img: "1000073299-min.jpg",
    desc: "An energising herbal tea blend for a delicious and refreshing boost of energy."
  },
  {
    name: "Formula IV Plus",
    price: 52.93,
    category: "Mineral and vitamins",
    img: "1000073298-min.jpg",
    desc: "Formula IV with additional mineral support and 50% more Tre-en-en®"
  },
  {
    name: "Tre-en-en",
    price: 45.72,
    category: "Mineral and vitamins",
    img: "1000073302-min.jpg",
    desc: "Whole grain concentrates provide cellular nutrition for energy and vitality"
  },
  {
    name: "Pro Vitality",
    price: 76.74,
    category: "Immunity",
    img: "1000073301-min.jpg",
    desc: "Boost your immune system with Pro Vitality."
  },
  
  
  {
    name: "Chelated Cal-Mag with 500 IU Vitamin D3",
    price: 35.71,
    category: "Joint Support",
    img: "1000073409-min.jpg",
    desc: "Highly bioavailable calcium, magnesium and 500 IU vitamin D3 for strong bones, teeth, nerve & muscle function and more."/* ===== PRODUCTS GRID ===== */
  },
  {
    name: "Full Motion",
    price: 48.65,
    category: "Joint Support",
    img: "1000073411-min.jpg",
    desc: "Glucosamine with herbs, phytonutrients, and minerals to help promote joint comfort and flexibility."
  },
  {
    name: "Vegan D with Vitamin D₂/D₃",
    price: 25.68,
    category: "Joint Support",
    img: "1000073413-min.jpg",
    desc: "Naturally sourced, whole-food based vitamin D2 and D3 are required for the maintenance of strong bones and normal immune function.."
  },
  {
    name: "Cruciferous Plus",
    price: 29.86,
    category: "Men's Health",
    img: "1000073415-min.jpg",
    desc: "Phytonutrient power of cruciferous vegetables in a convenient tablet."
  },
  {
    name: "Masculine Herbal Complex",
    price: 48.64,
    category: "Men's Health",
    img: "1000073741-min.jpg",
    desc: "Helps men regain renewed energy and physical vitality."
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
    

// === COUNTRY POPUP + REDIRECT LOGIC ===

// Open popup and detect country if not set
const popup = document.getElementById("country-popup");
const saveBtn = document.getElementById("save-country");
const countrySelect = document.getElementById("country-select");
const changeCountryBtn = document.getElementById("change-country");

// Detect and suggest country automatically using IP API
async function detectCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const countryCode = data.country_code;

    const countryMap = {
      US: "https://beta.neolife.com/peterezeudu/en-US/shop",
      GB: "https://shopneolife.com/peterezeudu/shop/atoz",
      NG: "https://shopneolife.com/peterezeudu/shop/atoz",
      CA: "https://beta.neolife.com/peterezeudu/en-CA/shop",
      AU: "https://shopneolife.com/peterezeudu/shop/atoz",
      ZA: "https://shopneolife.com/peterezeudu/shop/atoz",
      TZ: "https://shopneolife.com/peterezeudu/shop/atoz",
      BJ: "https://shopneolife.com/peterezeudu/shop/atoz",
      CM: "https://shopneolife.com/peterezeudu/shop/atoz",
      CI: "https://shopneolife.com/peterezeudu/shop/atoz",
      MZ: "https://shopneolife.com/peterezeudu/shop/atoz",
      GH: "https://shopneolife.com/peterezeudu/shop/atoz",
      KE: "https://shopneolife.com/peterezeudu/shop/atoz",
      UG: "https://shopneolife.com/peterezeudu/shop/atoz",
      NA: "https://shopneolife.com/peterezeudu/shop/atoz",
      TG: "https://shopneolife.com/peterezeudu/shop/atoz",
      SG: "https://shopneolife.com/peterezeudu/shop/atoz",
      PH: "https://shopneolife.com/peterezeudu/shop/atoz",
      RO: "https://shopneolife.com/peterezeudu/shop/atoz",
      NZ: "https://shopneolife.com/peterezeudu/shop/atoz",
      SI: "https://shopneolife.com/peterezeudu/shop/atoz",
      BW: "https://shopneolife.com/peterezeudu/shop/atoz",
      BA: "https://shopneolife.com/peterezeudu/shop/atoz",
      HR: "https://shopneolife.com/peterezeudu/shop/atoz",
      SZ: "https://shopneolife.com/peterezeudu/shop/atoz",
      LS: "https://shopneolife.com/peterezeudu/shop/atoz",
      MX: "https://shopneolife.com/peterezeudu/shop/atoz",
    };

    if (countryMap[countryCode]) {
      countrySelect.value = countryMap[countryCode];
    }
  } catch (error) {
    console.warn("Country detection failed:", error);
  }
}

// Show popup only if no country is saved
const savedCountry = localStorage.getItem("selectedCountry");
if (!savedCountry) {
  popup.style.display = "flex";
  detectCountry();
}

// Save country and redirect
saveBtn.addEventListener("click", () => {
  const selected = countrySelect.value;
  if (selected) {
    localStorage.setItem("selectedCountry", selected);
    window.location.href = selected;
  } else {
    alert("Please select your country before continuing.");
  }
});

// Change country manually
if (changeCountryBtn) {
  changeCountryBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    detectCountry();
  });
}

// === HANDLE ALL "SHOP NOW" BUTTONS ===
document.querySelectorAll(".shop-now").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const saved = localStorage.getItem("selectedCountry");

    if (saved) {
      window.location.href = saved;
    } else {
      popup.style.display = "flex";
      detectCountry();
    }
  });
});










    

// === REDIRECT WHEN SHOP NOW IS CLICKED ===
  if (shopNowBtn) {
    shopNowBtn.addEventListener("click", (e) => {
      e.preventDefault();
      savedCountry = localStorage.getItem("userCountry");

      if (savedCountry) {
        window.location.href = savedCountry;
      } else {
        popup.style.display = "flex";
      }
    });
  }
  












// === COUNTRY BUTTON AUTO UPDATE ===

// Show correct country when page loads
updateChangeCountryButton();


// === POPUP OPEN WHEN BUTTON IS CLICKED ===
if (changeCountryBtn) {
  changeCountryBtn.addEventListener("click", () => {
    document.getElementById("country-popup").style.display = "flex";
  });
}

// === UPDATE BUTTON AFTER USER SELECTS COUNTRY ===
const saveCountryBtn = document.getElementById("save-country");
if (saveCountryBtn) {
  saveCountryBtn.addEventListener("click", () => {
    setTimeout(updateChangeCountryButton, 500); // update button after saving
  });
    }
      













