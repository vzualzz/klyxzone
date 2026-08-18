gridEl.querySelectorAll(".buy").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = products.find(
        (p) => p.id === Number(btn.dataset.id)
      );

      state.cart.push(item);
      updateCart();
      openCart();
    });
  });
}

function updateCart() {
  const count = state.cart.length;

  const total = state.cart.reduce(
    (acc, item) => acc + item.price,
    0
  );

  cartCountEl.textContent = count;
  cartItemsCountEl.textContent = count;
  cartTotalEl.textContent = money(total);

  cartItemsEl.innerHTML = count
    ? state.cart
        .map(
          (item, index) => 
            <div class="cart-item">
              <div class="fallback">${item.initial}</div>

              <div>
                <strong>${item.name}</strong>
                <small>
                  ${money(item.price)} • ${item.category}
                </small>
              </div>

              <button class="btn" data-remove="${index}">
                x
              </button>
            </div>
          
        )
        .join("")
    : 
      <div class="stat">
        Seu carrinho está vazio.
      </div>
    ;

  cartItemsEl
    .querySelectorAll("[data-remove]")
    .forEach((btn) => {
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

document
  .getElementById("openCart")
  .addEventListener("click", openCart);

document
  .getElementById("closeCart")
  .addEventListener("click", closeCart);

overlayEl.addEventListener("click", closeCart);

renderChips();
renderGrid();
updateCart();
