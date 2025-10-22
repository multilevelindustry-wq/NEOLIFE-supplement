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
      US: "us.html",
      GB: "uk.hmtl",
      NG: "ng.html",
      CA: "ca.html",
      AU: "au.html",
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










    const products = [
      { name: "3 Day Detox (Single)", price: "$51.22", rating: 4.5, img: "1000075587-min.webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/3-day-detox-case" },
      { name: "3-Day Detox Limited Time Promo", price: "$38.42", rating: 4.7, img: "1000075590-min.webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/2025-detox-promo-2272" },
      { name: "3 Step System Combination to Oily (Single)", price: "$197.16", rating: 4.0, img: "landingpage_l (1).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/3-step-system-combination-to-oily" },
      { name: "Acidophilus Plus (Single)", price: "$66.77", rating: 4.0, img: "landingpage_l (2).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/acidophilus-plus" },
      { name: "All Natural Fiber Food & Drink Mix (Single)", price: "$68.23", rating: 4.4, img: "landingpage_l (3).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/all-natural-fiber-food-drink-mix" },
      { name: "Aloe Vera Gel (Single)", price: "$22.63", rating: 4.5, img: "landingpage_l (5).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/aloe-vera-gel" },
      { name: "Aloe Vera Plus (Single)", price: "$39.93", rating: 5.0, img: "landingpage_l (4).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/aloe-vera-plus" },
      { name: "Beta-Gest Digestive Aid (Single)", price: "$36.76", rating: 4.5, img: "landingpage_l (7).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/betagest-digestive-aid" },
      { name: "Balancing Tonic (All Skin Types)", price: "$33.01", rating: 4.0, img: "landingpage_l (6).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/balancing-tonic" },
      { name: "Breakfast Solution (1v,1b)", price: "$$203.14", rating: 4.2, img: "landingpage_l (11).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/breakfast-solution" },
      { name: "Bio-Tone (Single)", price: "$$52.08", rating: 4.8, img: "landingpage_l (10).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/biotone" },
      { name: "Betagard (Single)", price: "$$58.32", rating: 4.6, img: "landingpage_l (9).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/betagard" },
      { name: "Beta-Zyme (Single)", price: "$$68.88", rating: 4.3, img: "landingpage_l (8).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/betazyme" },
      { name: "Breakfast Solution Performance Protein", price: "$229.16", rating: 3.9, img: "landingpage_l (12).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/breakfast-solution-performance-protein" },
      { name: "Breakfast Solution Pkts (1v,1b)", price: "$221.80", rating: 4.7, img: "landingpage_l (11).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/breakfast-solution-packets" },
      { name: "Carotenoid Complex (Single)", price: "$73.17", rating: 4.4, img: "landingpage_l (14).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/carotenoid-complex" },
      { name: "Chelated Cal-Mag with 1000 IU Vitamin D Tablet (Single)", price: "$40.54", rating: 4.9, img: "landingpage_l (15).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/cal-mag-complex-w-1000iu-vit-d" },
      { name: "Chelated Cal-Mag with 400 IU vitamin D Capsule (Single)", price: "$51.09", rating: 4.1, img: "landingpage_l (16).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/chelated-calmag-with-400-iu-vitamin-d" },
      { name: "Cleansing Gel (Single)", price: "$42.55", rating: 4.6, img: "landingpage_l (17).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/cleansing-gel" },
      { name: "Cleansing Milk (Single)", price: "$42.55", rating: 4.5, img: "landingpage_l (18).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/cleansing-milk" },
      { name: "CoQ10 (Single)", price: "$62.49", rating: 4.6, img: "landingpage_l (19).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/coq10" },
      { name: "Core3 (1v,1b)", price: "$278.60", rating: 4.7, img: "landingpage_l (20).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/core3" },
      { name: "Core3 Packets (1v,1b)", price: "$297.26", rating: 5.0, img: "landingpage_l (21).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/core3-packets" },
      { name: "Core3 Performance", price: "$304.62", rating: 5.0, img: "landingpage_l (22).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/core3-performance-protein" },
      { name: "3 Step System Normal to Dry (Single)", price: "$197.16", rating: 4.7, img: "landingpage_l (23).webp", link: "https://beta.neolife.com/peterezeudu/en-US/shop/product/3-step-system-normal-to-dry" }
    ];

    const grid = document.getElementById("productGrid");

    function getStars(rating) {
      const full = Math.floor(rating);
      const half = rating % 1 !== 0;
      let stars = "★".repeat(full);
      if (half) stars += "½";
      return stars;
    }

    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="product-info">
          <h3>${p.name}</h3>
          <span class="price">${p.price}</span>
          <div class="stars">${getStars(p.rating)} (${p.rating})</div>
          <a href="${p.link}" class="btn-view">View More</a>
        </div>
      `;
      grid.appendChild(card);
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
      
