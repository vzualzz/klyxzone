const products = [
      {
        id: 1,
        name: "Beast X Max",
        category: "mouses",
        price: 1349.91,
        desc: "Leve, preciso e com acabamento monocromático.",
        initial: "B"
            image: "imagens1/beast1.webp"
      },
      {
        id: 2,
        name: "Mouse esportivo high DPI",
        category: "mouses",
        price: 289.90,
        desc: "Design enxuto para performance e controle.",
        initial: "M"
      },
      {
        id: 3,
        name: "Teclado Hall Effect 65%",
        category: "teclados",
        price: 899.90,
        desc: "Formato compacto com aparência premium.",
        initial: "T"
      },
      {
        id: 4,
        name: "Teclado mecânico TKL branco",
        category: "teclados",
        price: 499.90,
        desc: "Visual limpo com teclas de alta resposta.",
        initial: "T"
      },
      {
        id: 5,
        name: "Mousepad control XL",
        category: "mousepads",
        price: 149.90,
        desc: "Base estável, textura suave e grande área útil.",
        initial: "P"
      },
      {
        id: 6,
        name: "Mousepad speed XXL",
        category: "mousepads",
        price: 179.90,
        desc: "Deslize rápido com acabamento minimalista.",
        initial: "P"
      },
      {
        id: 7,
        name: "Headset premium black",
        category: "audio",
        price: 459.90,
        desc: "Som limpo e visual discreto para o setup.",
        initial: "A"
      },
      {
        id: 8,
        name: "Controle wireless branco",
        category: "controles",
        price: 239.90,
        desc: "Pegada confortável e design moderno.",
        initial: "C"
      },
    ];

    const state = {
      query: "",
      category: "todos",
      cart: []
    };

    const money = (value) =>
      value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    const categories = ["todos", ...new Set(products.map(p => p.category))];

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

    function renderChips() {
      chipsEl.innerHTML = categories.map(cat => `
        <button class="chip ${
          state.category === cat ? "active" : ""
        }" data-cat="${cat}">
          ${cat === "todos" ? "Todos" : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      `).join("");

      chipsEl.querySelectorAll(".chip").forEach(btn => {
        btn.addEventListener("click", () => {
          state.category = btn.dataset.cat;
          renderChips();
          renderGrid();
        });
      });
    }

    function filteredProducts() {
      return products.filter(p => {
        const matchesCategory = state.category === "todos" || p.category === state.category;
        const q = state.query.trim().toLowerCase();
        const matchesQuery = !q || [p.name, p.desc, p.category].join(" ").toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      });
    }

    function productCard(p) {
      return `
        <article class="product">
          <div class="thumb">
          ${p.image}" alt="$
          {p.name}">`
            :`<div class="fallback">$
            {p.intitial}</div>`
    }
          </div>
          <div class="content">
            <div class="tag">${p.category}</div>
            <h3 class="name">${p.name}</h3>
            <p class="desc">${p.desc}</p>
            <div class="price-row">
              <div>
                <div class="price">${money(p.price)}</div>
              </div>
              <button class="buy" data-id="${p.id}">Adicionar</button>
            </div>
          </div>
        </article>
      `;
    }

    function renderGrid() {
      const items = filteredProducts();
      gridEl.innerHTML = items.length
        ? items.map(productCard).join("")
        : `<div class="stat" style="grid-column:1/-1;">Nenhum produto encontrado.</div>`;

      gridEl.querySelectorAll(".buy").forEach(btn => {
        btn.addEventListener("click", () => {
          const item = products.find(p => p.id === Number(btn.dataset.id));
          state.cart.push(item);
          updateCart();
          openCart();
        });
      });
    }

    function updateCart() {
      const count = state.cart.length;
      const total = state.cart.reduce((acc, item) => acc + item.price, 0);

      cartCountEl.textContent = count;
      cartItemsCountEl.textContent = count;
      cartTotalEl.textContent = money(total);

      cartItemsEl.innerHTML = count
        ? state.cart.map((item, index) => `
            <div class="cart-item">
              <div class="fallback">${item.initial}</div>
              <div>
                <strong>${item.name}</strong>
                <small>${money(item.price)} • ${item.category}</small>
              </div>
              <button class="btn" data-remove="${index}">x</button>
            </div>
          `).join("")
        : `<div class="stat">Seu carrinho está vazio.</div>`;

      cartItemsEl.querySelectorAll("[data-remove]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.cart.splice(Number(btn.dataset.remove), 1);
          updateCart();
        });
      });
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

    searchEl.addEventListener("input", (e) => {
      state.query = e.target.value;
      renderGrid();
    });

    clearEl.addEventListener("click", () => {
      state.query = "";
      state.category = "todos";
      searchEl.value = "";
      renderChips();
      renderGrid();
    });

    document.getElementById("openCart").addEventListener("click", openCart);
    document.getElementById("closeCart").addEventListener("click", closeCart);
    overlayEl.addEventListener("click", closeCart);

    renderChips();
    renderGrid();
    updateCart();
