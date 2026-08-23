const products = [
  { id: 1, name: "Beast X Max", category: "mouses", price: 1349.91, desc: "Leve, preciso e com acabamento monocromático.", initial: "B", image: "imagens1/beast1.webp" },
  { id: 2, name: "ATK Ghost Extreme Carbon Fiber", category: "mouses", price: 989.91, desc: "Design enxuto para performance e controle.", initial: "A", image: "imagens1/atkghost.webp" },
  { id: 3, name: "Aspas RS6 Ultra HE", category: "teclados", price: 1889.91, desc: "Formato compacto com aparência premium.", initial: "A", image: "imagens1/aspasrs6.webp" },
  { id: 4, name: "ATK RS7 Air", category: "teclados", price: 701.91, desc: "Visual limpo com teclas de alta resposta.", initial: "R", image: "imagens1/rs7air.webp" },
  { id: 5, name: "Artisan FX Hien XXL", category: "mousepads", price: 602.91, desc: "Base estável, textura suave e grande área útil.", initial: "H", image: "imagens1/artisanhienblue.webp" },
  { id: 6, name: "Artisan FX Zero XXL", category: "mousepads", price: 683.91, desc: "Deslize rápido com acabamento minimalista.", initial: "Z", image: "imagens1/artisanfxzero.jpg" },
  { id: 7, name: "Mchose V9 Pro", category: "audio", price: 450.91, desc: "Som limpo e visual discreto para o setup.", initial: "M", image: "imagens1/mchosev9pro.png" },
  { id: 8, name: "Manguito Talon Games", category: "manguitos", price: 119.91, desc: "Manguito confortável e design moderno.", initial: "M", image: "imagens1/manguito1.png" }
  { id: 9, name: "MOMOLADA GOTOSA", category: "manguitos", price: 159.91, desc: "Manguito confortável e design moderno.", initial: "B", image: "" }
];

const state = { query: "", category: "todos", cart: [] };

const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const categories = ["todos", ...new Set(products.map(product => product.category))];

const chipsEl = document.getElementById("chips");
const gridEl = document.getElementById("grid");
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

  const thumb = document.createElement("div");
  thumb.className = "thumb";

  if (product.image) {
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    thumb.appendChild(image);
  } else {
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

  const description = document.createElement("p");
  description.className = "desc";
  description.textContent = product.desc;

  const priceRow = document.createElement("div");
  priceRow.className = "price-row";

  const priceContainer = document.createElement("div");
  const price = document.createElement("div");
  price.className = "price";
  price.textContent = money(product.price);

  const buyButton = document.createElement("button");
  buyButton.className = "buy";
  buyButton.dataset.id = product.id;
  buyButton.textContent = "Adicionar";
  buyButton.addEventListener("click", () => addToCart(product.id));

  priceContainer.appendChild(price);
  priceRow.appendChild(priceContainer);
  priceRow.appendChild(buyButton);
  content.append(tag, name, description, priceRow);
  article.append(thumb, content);

  return article;
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
