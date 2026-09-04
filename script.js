const products = [
  { id: 1, name: "Beast X Max", category: "mouses", price: 1349.91, desc: "Leve, preciso e com acabamento monocromático.", initial: "B", image: "imagens1/beast1.webp", imageHover: "imagens1/beastblue.webp", gallery: [ "imagens1/beast1.webp", "imagens1/beastblue.webp" ] },
  { id: 2, name: "ATK Ghost Extreme Carbon Fiber", category: "mouses", price: 989.91, desc: "Design enxuto para performance e controle.", initial: "A", image: "imagens1/atkghost.webp", imageHover: "imagens1/atkghost2.webp" },
  { id: 3, name: "Aspas RS6 Ultra HE", category: "teclados", price: 1889.91, desc: "Formato compacto com aparência premium.", initial: "A", image: "imagens1/aspasrs6.webp", imageHover: "imagens1/aspasrs61.webp", gallery: [ "imagens1/aspasrs6.webp", "imagens1/aspasrs61.webp", "imagens1/aspasrs62.webp", "imagens1/aspasrs63.webp" ] },
  { id: 4, name: "ATK RS6 Air", category: "teclados", price: 701.91, desc: "Visual limpo com teclas de alta resposta.", initial: "R", image: "imagens1/rs7air.webp", imageHover: "imagens1/rs6air3.webp", gallery: ["imagens1/rs7air.webp", "imagens1/rs6air3.webp"] },
  { id: 5, name: "Artisan FX Hien XXL", category: "mousepads", price: 602.91, desc: "Base estável, textura suave e grande área útil.", initial: "H", image: "imagens1/artisanhienblue.webp" },
  { id: 6, name: "Artisan FX Zero XXL", category: "mousepads", price: 683.91, desc: "Deslize rápido com acabamento minimalista.", initial: "Z", image: "imagens1/artisanfxzero.jpg" },
  { id: 7, name: "Mchose V9 Pro", category: "audio", price: 450.91, desc: "Som limpo e visual discreto para o setup.", initial: "M", image: "imagens1/mchosev9pro.png" },
  { id: 8, name: "Manguito Talon Games", category: "manguitos", price: 119.91, desc: "Manguito confortável e design moderno.", initial: "M", image: "imagens1/manguito1.png" },
  { id: 9, name: "Feets Universais", category: "feets", price: 87.91, desc: "Feets Universais Speed.", initial: "F", image: "imagens1/feets.png" },
  { id: 10, name: "NemVira Doll", category: "mousepads", price: 340.91, desc: "NemVira Doll é um mousepad de tecido extremamente raro, feito para quem busca algo diferente e difícil de encontrar.", initial: "D", image: "imagens1/nemviradollmain.jfif", imageHover: "imagens1/nemviradoll.jfif", gallery: [ "imagens1/nemviradollmain.jfif", "imagens1/nemviradoll.jfif", "imagens1/nemviradoll1.jfif" ] },
  { id: 11, name: "SAYO Glass", category: "glasspads", price: 851.91, desc: "O Dysphoria Sayo Glass Pad é um mousepad de vidro desenvolvido com foco em velocidade, utilizando uma construção fina e uma superfície micro-coated especialmente desenvolvida para proporcionar um deslize rápido, suave e consistente. O Sayo combina uma superfície orientada para velocidade com uma construção de baixo perfil, oferecendo baixa resistência durante a movimentação do mouse.", initial: "S", image: "imagens1/sayoglass.webp", imageHover: "imagens1/sayoglass2.webp", gallery: [ "imagens1/sayoglass.webp", "imagens1/sayoglass2.webp" ],
  galleryScales: [1, 1.4]},
  { id: 12, name: "Kokū — The Void Glass Edition", category: "glasspads", price: 976.91, desc: "Nomeado a partir do conceito japonês de void and open sky,   Kokū - The Void não é apenas um glasspad. É uma declaração. Uma superfície de vidro de edição limitada feita para quem exige precisão sem compromissos e beleza sem ruído.", initial: "K", image: "imagens1/koku.webp", imageHover: "imagens1/koku2.webp", gallery: [ "imagens1/koku.webp", "imagens1/koku2.webp" ] },
  { id: 13, name: "OP1w 4K v2", category: "mouses", price: 854.91, desc: "O Endgame Gear OP1w 4K V2 foi projetado para entregar resposta ultrarrápida, construção robusta e controle preciso, atendendo tanto jogadores casuais quanto profissionais.", initial: "O", image: "imagens1/op1wv2.webp", imageHover: "imagens1/op1wv22.webp", gallery: [ "imagens1/op1wv2.webp", "imagens1/op1wv22.webp", "imagens1/op1wv23.webp" ] },
  { id: 14, name: "ATK RS6+", category: "teclados", price: 776.91, desc: "A evolução da Série RS une armadura mecha totalmente transparente com precisão de elite. Impulsionada pela solução Blazing Wind ULTRA da Gen-3, esta série entrega resposta instantânea e precisão cirúrgica. Com 5-Layer Acoustic Padding e Frosted-Top Keycaps, ela é meticulosamente ajustada para um som HiFi puro e uma experiência tátil refinada.", initial: "R", image: "imagens1/rs6plus1.webp", imageHover: "imagens1/ras6plus.webp", gallery: [ "imagens1/rs6plus1.webp", "imagens1/ras6plus.webp", "imagens1/rs6plus6.webp", "imagens1/rs6plus3.webp", "imagens1/rs6pluspink.webp", "imagens1/rs6plus4.webp" ] },
  { id: 15, name: "真夜Mayo", category: "glasspads", price: 754.91, desc: "Superfície revestida de nano proporciona um deslize ultra suave com movimentos rápidos e responsivos. Um feedback sutil na superfície ajuda a manter o controle preciso em cada movimento.", initial: "M", image: "imagens1/mayo1.webp", imageHover: "imagens1/mayo2.jpg", gallery: [ "imagens1/mayo1.webp", "imagens1/mayo2.jpg", "imagens1/mayo3.webp" ] },
  { id: 16, name: "Mercury V60 Pro Deluxe Edition ", category: "teclados", price: 1237.91, desc: "Projetado para precisão de 0,005 mm com profundidade de disparo ajustável (0,005 mm–3,5 mm) para eliminar o atraso e melhorar o controle.", initial: "M", image: "imagens1/mercuryv60pro.webp", imageHover: "imagens1/mercuryv60pro2.webp", gallery: [ "imagens1/mercuryv60pro.webp", "imagens1/mercuryv60pro2.webp" ] }
];

const shelves = {

  global: [15, 10, 11, 12, 14, 16],

  featured: [13, 1, 4, 6, 7],

  exclusive: [12, 3, 11, 14, 15, 16]

};
const state = {
  query: "",
  category: "todos",
  cart: JSON.parse(localStorage.getItem("klyxCart")) || []
};

const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const categories = ["todos", ...new Set(products.map(product => product.category))];

const chipsEl = document.getElementById("chips");
const gridEl = document.getElementById("grid");

const globalGridEl = document.getElementById("globalGrid");
const featuredGridEl = document.getElementById("featuredGrid");
const exclusiveGridEl = document.getElementById("exclusiveGrid");

const searchEl = document.getElementById("search");
const clearEl = document.getElementById("clearFilters");
const cartCountEl = document.getElementById("cartCount");
const cartItemsCountEl = document.getElementById("cartItemsCount");
const cartTotalEl = document.getElementById("cartTotal");
const cartItemsEl = document.getElementById("cartItems");
const drawerEl = document.getElementById("drawer");
const overlayEl = document.getElementById("overlay");
const openCartEl = document.getElementById("openCart");
const closeCartEl = document.getElementById("closeCart");
const checkoutButton =
  document.getElementById("checkoutButton");

function renderChips() {
  chipsEl.innerHTML = "";
  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "chip";
    if (state.category === category) button.classList.add("active");
    button.dataset.cat = category;
    button.textContent = category === "todos" ? "Todos" : category.charAt(0).toUpperCase() + category.slice(1);
    button.addEventListener("click", () => {
      state.category = category;
      renderChips();
      renderGrid();
    });
    chipsEl.appendChild(button);
  });
}

function filteredProducts() {
  return products.filter(product => {
    const matchesCategory = state.category === "todos" || product.category === state.category;
    const query = state.query.trim().toLowerCase();
    const matchesQuery = !query || [product.name, product.desc, product.category].join(" ").toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
}

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product";
  article.addEventListener("click", () => {
  localStorage.setItem(
    "klyxSelectedProduct",
    JSON.stringify(product)
  );

  window.location.href = `produto.html?id=${product.id}`;
});


  const thumb = document.createElement("div");
  thumb.className = "thumb";

  if (product.image) {

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;
  image.loading = "lazy";
  image.className = "product-image";

  thumb.appendChild(image);

  if (product.imageHover) {

    const imageHover = document.createElement("img");
    imageHover.src = product.imageHover;
    imageHover.alt = product.name;
    imageHover.loading = "lazy";
    imageHover.className = "product-image-hover";

    thumb.appendChild(imageHover);
  }

}
  else {
    const fallback = document.createElement("div");
    fallback.className = "fallback";
    fallback.textContent = product.initial;
    thumb.appendChild(fallback);
  }

  const content = document.createElement("div");
  content.className = "content";

  const tag = document.createElement("div");
  tag.className = "tag";
  tag.textContent = product.category;

  const name = document.createElement("h3");
  name.className = "name";
  name.textContent = product.name;

  const priceRow = document.createElement("div");
priceRow.className = "price-row";

  const priceContainer = document.createElement("div");

  const price = document.createElement("div");
price.className = "price";
price.textContent = money(product.price);

  const installment = document.createElement("div");
installment.className = "installment";
installment.textContent = `10x de ${money(product.price / 10)} sem juros`;

priceContainer.appendChild(price);
priceContainer.appendChild(installment);

priceRow.appendChild(priceContainer);

content.append(tag, name, priceRow);
article.append(thumb, content);

return article;
}

/* =========================
   RENDERIZAR VITRINES
========================= */

function renderShelf(productIds, container) {

  if (!container) return;

  container.innerHTML = "";

  productIds.forEach(id => {

    const product = products.find(
      item => item.id === id
    );

    if (!product) return;

    container.appendChild(
      createProductCard(product)
    );

  });

}


function renderShelves() {

  renderShelf(
    shelves.global,
    globalGridEl
  );

  renderShelf(
    shelves.featured,
    featuredGridEl
  );

  renderShelf(
    shelves.exclusive,
    exclusiveGridEl
  );

}

function renderGrid() {
  const items = filteredProducts();
  gridEl.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "stat";
    empty.style.gridColumn = "1 / -1";
    empty.textContent = "Nenhum produto encontrado.";
    gridEl.appendChild(empty);
    return;
  }

  items.forEach(product => gridEl.appendChild(createProductCard(product)));
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  openCart();
}

function updateCart() {
  localStorage.setItem("klyxCart", JSON.stringify(state.cart));
  
  const count = state.cart.reduce((total, item) => total + item.quantity, 0);
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCountEl.textContent = count;
  cartItemsCountEl.textContent = count;
  cartTotalEl.textContent = money(total);
  cartItemsEl.innerHTML = "";

  if (!state.cart.length) {
    const empty = document.createElement("div");
    empty.className = "stat";
    empty.textContent = "Seu carrinho está vazio.";
    cartItemsEl.appendChild(empty);
    return;
  }

  state.cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const thumb = document.createElement("div");
    thumb.className = "fallback";

    if (item.image) {
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = item.name;
      image.loading = "lazy";
      thumb.appendChild(image);
    } else {
      thumb.textContent = item.initial;
    }

    const info = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = item.name;

    const details = document.createElement("small");
    details.textContent = `${money(item.price)} • ${item.category}
    `;
    const quantityRow =
      document.createElement("div");
    quantityRow.className = "quantity-row";
    
    const quantityLabel =
      document.createElement("span");
    quantityLabel.textContent = "Quantidade:";
    
    const increaseButton = 
    document.createElement("button");
    increaseButton.className = "btn";
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click"
                                    , () => {
                                      item.quantity += 1;
                                      updateCart();
                                    });
    const removeButton = document.createElement("button");
    removeButton.className = "btn";
    removeButton.textContent = "x";
    removeButton.addEventListener("click", () => removeFromCart(item.id));
    
    const decreaseButton =
      document.createElement("button");
    decreaseButton.className = "btn";
    decreaseButton.textContent = "-";
    
    decreaseButton.addEventListener("click"
                                    , () => {
                                      if (item.quantity > 1) {
                                        item.quantity -= 1;
                                        updateCart();
                                      } else {
                                        removeFromCart(item.id);
                                      }
                                    });
quantityRow.appendChild(quantityLabel);
quantityRow.appendChild(decreaseButton)
  ;
    const quantityValue =
    document.createElement('span');
    quantityValue.textContent =
    item.quantity;
    quantityRow.appendChild(quantityValue);
    
    quantityRow.appendChild(increaseButton)
  ;

info.append(name, details, quantityRow);
    
    cartItem.append(thumb, info, removeButton);
    cartItemsEl.appendChild(cartItem);
  });
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  updateCart();
}

function openCart() {
  drawerEl.classList.add("open");
  overlayEl.classList.add("open");
  drawerEl.setAttribute("aria-hidden", "false");
}

function closeCart() {
  drawerEl.classList.remove("open");
  overlayEl.classList.remove("open");
  drawerEl.setAttribute("aria-hidden", "true");
}

searchEl.addEventListener("input", event => {
  state.query = event.target.value;
  renderGrid();
});

clearEl.addEventListener("click", () => {
  state.query = "";
  state.category = "todos";
  searchEl.value = "";
  renderChips();
  renderGrid();
});

openCartEl.addEventListener("click", openCart);
closeCartEl.addEventListener("click", closeCart);
overlayEl.addEventListener("click", closeCart);

renderChips();
renderGrid();
renderShelves();
updateCart();

checkoutButton.addEventListener("click", () => {
  if (!state.cart.length) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let message = "🛒 *Pedido via Loja Online* %0A%0A";
  state.cart.forEach(item => {
    message += `• ${item.name} %0A   Quantidade: ${item.quantity}x %0A   Preço unitário: ${money(item.price)} %0A%0A`;
  });

  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  message += `💰 *Total:* ${money(total)} %0A%0A`;
  message += "📦 Por favor, confirme o endereço de entrega.";

  const whatsappNumber = "5531972247548";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(whatsappUrl, "_blank");
});
/* =========================
   HERO CAROUSEL
========================= */

const heroSlides =
  document.querySelectorAll(".hero-slide");

const heroDots =
  document.querySelectorAll(".hero-dot");

let currentHeroSlide = 0;
let heroInterval;


function showHeroSlide(index) {

  if (!heroSlides.length) return;

  heroSlides.forEach((slide, i) => {
    slide.classList.toggle(
      "active",
      i === index
    );
  });

  heroDots.forEach((dot, i) => {
    dot.classList.toggle(
      "active",
      i === index
    );
  });

  currentHeroSlide = index;
}


function nextHeroSlide() {

  const nextIndex =
    (currentHeroSlide + 1) %
    heroSlides.length;

  showHeroSlide(nextIndex);
}


function startHeroCarousel() {

  clearInterval(heroInterval);

  heroInterval = setInterval(
    nextHeroSlide,
    6000
  );
}


/* =========================
   CLIQUE NAS BOLINHAS
========================= */

heroDots.forEach(dot => {

  dot.addEventListener("click", () => {

    const index =
      Number(dot.dataset.slide);

    showHeroSlide(index);

    startHeroCarousel();

  });

});


/* INICIA */

showHeroSlide(0);
startHeroCarousel();

document.querySelectorAll(".product-shelf").forEach((shelf) => {
  const products = shelf.querySelector(".horizontal-products");
  const prev = shelf.querySelector(".shelf-prev");
  const next = shelf.querySelector(".shelf-next");

  if (!products || !prev || !next) return;

  const scrollAmount = () => {
    const card = products.querySelector(".product");

    if (!card) {
      return products.clientWidth * 0.8;
    }

    const gap = parseFloat(getComputedStyle(products).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  prev.addEventListener("click", () => {
    products.scrollBy({
      left: -scrollAmount(),
      behavior: "smooth"
    });
  });

  next.addEventListener("click", () => {
    products.scrollBy({
      left: scrollAmount(),
      behavior: "smooth"
    });
  });
});

// =========================
// ARRASTE DO BANNER
// =========================

const heroSlider = document.getElementById("heroSlider");

if (heroSlider && heroSlides.length > 1) {
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let dragDistance = 0;

  function startDrag(x) {
    isDragging = true;
    startX = x;
    currentX = x;
    dragDistance = 0;

    heroSlider.classList.add("dragging");

    clearInterval(heroInterval);
  }

  function moveDrag(x) {
    if (!isDragging) return;

    currentX = x;
    dragDistance = currentX - startX;
  }

  function endDrag() {
    if (!isDragging) return;

    isDragging = false;
    heroSlider.classList.remove("dragging");

    const threshold = 70;

    if (dragDistance < -threshold) {
      nextHeroSlide();
    }

    if (dragDistance > threshold) {
      const previousIndex =
        (currentHeroSlide - 1 + heroSlides.length) %
        heroSlides.length;

      showHeroSlide(previousIndex);
    }

    startHeroCarousel();
  }

  // MOUSE
  heroSlider.addEventListener("mousedown", (event) => {
    startDrag(event.clientX);
  });

  window.addEventListener("mousemove", (event) => {
    moveDrag(event.clientX);
  });

  window.addEventListener("mouseup", endDrag);

  // TOUCH
  heroSlider.addEventListener("touchstart", (event) => {
    startDrag(event.touches[0].clientX);
  }, { passive: true });

  heroSlider.addEventListener("touchmove", (event) => {
    moveDrag(event.touches[0].clientX);
  }, { passive: true });

  heroSlider.addEventListener("touchend", endDrag);
}
