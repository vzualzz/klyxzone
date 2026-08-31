const productData = localStorage.getItem("klyxSelectedProduct");

if (!productData) {
  window.location.href = "index.html#produtos";
}

const product = JSON.parse(productData);

const mainImage = document.getElementById("productMainImage");
const thumbnails = document.getElementById("productThumbnails");

const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const installmentPrice = document.getElementById("installmentPrice");
const productDescription = document.getElementById("productDescription");

const quantityElement = document.getElementById("productQuantity");
const decreaseButton = document.getElementById("decreaseProduct");
const increaseButton = document.getElementById("increaseProduct");
const addButton = document.getElementById("addProductToCart");

const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartItemsCount = document.getElementById("cartItemsCount");
const cartTotal = document.getElementById("cartTotal");

let quantity = 1;


/* =========================
   DINHEIRO
========================= */

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });


/* =========================
   INFORMAÇÕES DO PRODUTO
========================= */

productName.textContent = product.name;

productCategory.textContent =
  product.category.toUpperCase();

productPrice.textContent =
  money(product.price);

const installment = product.price / 10;

installmentPrice.textContent =
  `10x de ${money(installment)}`;

productDescription.textContent =
  product.desc;


/* =========================
   GALERIA DE IMAGENS
========================= */

const gallery = product.gallery || [product.image];

gallery.forEach((imageSrc, index) => {

  /* IMAGEM PRINCIPAL */

  if (index === 0) {

    const image = document.createElement("img");

    image.src = imageSrc;
    image.alt = product.name;

    mainImage.appendChild(image);

  }


  /* MINIATURA */

  const thumbnail =
    document.createElement("button");

  thumbnail.className =
    "product-thumbnail";

  if (index === 0) {
    thumbnail.classList.add("active");
  }


  const thumbnailImage =
    document.createElement("img");

  thumbnailImage.src = imageSrc;
  thumbnailImage.alt = product.name;


  thumbnail.appendChild(thumbnailImage);

  thumbnails.appendChild(thumbnail);


  /* TROCAR IMAGEM AO CLICAR */

  thumbnail.addEventListener("click", () => {

    mainImage.innerHTML = "";

    const newImage =
      document.createElement("img");

    newImage.src = imageSrc;
    newImage.alt = product.name;

    mainImage.appendChild(newImage);


    document
      .querySelectorAll(".product-thumbnail")
      .forEach(item => {
        item.classList.remove("active");
      });

    thumbnail.classList.add("active");

  });

});

/* =========================
   QUANTIDADE
========================= */

decreaseButton.addEventListener("click", () => {

  if (quantity > 1) {

    quantity--;

    quantityElement.textContent =
      quantity;

  }

});


increaseButton.addEventListener("click", () => {

  quantity++;

  quantityElement.textContent =
    quantity;

});


/* =========================
   CARRINHO
========================= */

function getCart() {
  return JSON.parse(localStorage.getItem("klyxCart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("klyxCart", JSON.stringify(cart));
}


/* =========================
   ATUALIZAR CARRINHO
========================= */

function updateCart() {

  const cart = getCart();

  let totalItems = 0;
  let totalPrice = 0;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {

    totalItems += Number(item.quantity) || 0;
    totalPrice += Number(item.price) * Number(item.quantity);

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";


    /* IMAGEM */

    if (item.image) {

      const image = document.createElement("img");

      image.src = item.image;
      image.alt = item.name;
      image.loading = "lazy";

      cartItem.appendChild(image);

    } else {

      const fallback = document.createElement("div");

      fallback.className = "fallback";
      fallback.textContent = item.initial || "K";

      cartItem.appendChild(fallback);

    }


    /* INFORMAÇÕES */

    const info = document.createElement("div");

    const name = document.createElement("strong");

    name.textContent = item.name;


    const details = document.createElement("small");

    details.textContent =
      `${item.quantity}x • ${money(item.price)}`;


    info.appendChild(name);
    info.appendChild(details);


    /* QUANTIDADE */

    const quantityRow = document.createElement("div");

    quantityRow.className = "quantity-row";


    const decreaseButton =
      document.createElement("button");

    decreaseButton.className = "btn";
    decreaseButton.textContent = "-";


    decreaseButton.addEventListener("click", () => {

      if (item.quantity > 1) {

        item.quantity--;

      } else {

        cart.splice(index, 1);

      }

      saveCart(cart);
      updateCart();

    });


    const quantityValue =
      document.createElement("span");

    quantityValue.textContent = item.quantity;


    const increaseButton =
      document.createElement("button");

    increaseButton.className = "btn";
    increaseButton.textContent = "+";


    increaseButton.addEventListener("click", () => {

      item.quantity++;

      saveCart(cart);
      updateCart();

    });


    quantityRow.appendChild(decreaseButton);
    quantityRow.appendChild(quantityValue);
    quantityRow.appendChild(increaseButton);

    info.appendChild(quantityRow);


    /* REMOVER */

    const removeButton =
      document.createElement("button");

    removeButton.className = "btn";
    removeButton.textContent = "×";


    removeButton.addEventListener("click", () => {

      cart.splice(index, 1);

      saveCart(cart);
      updateCart();

    });


    cartItem.appendChild(info);
    cartItem.appendChild(removeButton);

    cartItems.appendChild(cartItem);

  });


  /* CONTADOR DO TOPO */

  cartCount.textContent = totalItems;

  cartItemsCount.textContent = totalItems;

  cartTotal.textContent = money(totalPrice);

}

/* =========================
   ATUALIZAR CARRINHO
========================= */

function updateCart() {

  const cart = getCart();

  let totalItems = 0;
  let totalPrice = 0;

  cartItems.innerHTML = "";


  cart.forEach((item, index) => {

    totalItems += item.quantity;

    totalPrice +=
      item.price * item.quantity;


    const cartItem =
      document.createElement("div");

    cartItem.className =
      "cart-item";


    /* IMAGEM */

    if (item.image) {

      const image =
        document.createElement("img");

      image.src = item.image;
      image.alt = item.name;

      cartItem.appendChild(image);

    } else {

      const fallback =
        document.createElement("div");

      fallback.className =
        "fallback";

      fallback.textContent = "K";

      cartItem.appendChild(fallback);

    }


    /* INFORMAÇÕES */

    const info =
      document.createElement("div");


    const name =
      document.createElement("strong");

    name.textContent =
      item.name;


    const details =
      document.createElement("small");

    details.textContent =
      `${item.quantity}x • ${money(item.price)}`;


    info.appendChild(name);
    info.appendChild(details);


    /* REMOVER */

    const removeButton =
      document.createElement("button");

    removeButton.className =
      "btn";

    removeButton.textContent =
      "×";


    removeButton.addEventListener(
      "click",
      () => {

        cart.splice(index, 1);

        saveCart(cart);

        updateCart();

      }
    );


    cartItem.appendChild(info);

    cartItem.appendChild(
      removeButton
    );


    cartItems.appendChild(
      cartItem
    );

  });


  cartCount.textContent =
    totalItems;

  cartItemsCount.textContent =
    totalItems;

  cartTotal.textContent =
    money(totalPrice);

}


/* =========================
   ABRIR CARRINHO
========================= */

if (openCartButton) {

  openCartButton.addEventListener(
    "click",
    () => {

      drawer.classList.add("open");

      overlay.classList.add("open");

      drawer.setAttribute(
        "aria-hidden",
        "false"
      );

      updateCart();

    }
  );

}


/* =========================
   FECHAR CARRINHO
========================= */

function closeCart() {

  drawer.classList.remove("open");

  overlay.classList.remove("open");

  drawer.setAttribute(
    "aria-hidden",
    "true"
  );

}


if (closeCartButton) {

  closeCartButton.addEventListener(
    "click",
    closeCart
  );

}


if (overlay) {

  overlay.addEventListener(
    "click",
    closeCart
  );

}


/* =========================
   ADICIONAR AO CARRINHO
========================= */

addButton.addEventListener(
  "click",
  () => {

    const cart = getCart();


    const existing =
      cart.find(
        item => item.id === product.id
      );


    if (existing) {

      existing.quantity += quantity;

    } else {

      cart.push({

        ...product,

        quantity

      });

    }


    saveCart(cart);

    updateCart();


    addButton.textContent =
      "ADICIONADO AO CARRINHO ✓";


    /* ABRE O CARRINHO */

    setTimeout(() => {

      drawer.classList.add("open");

      overlay.classList.add("open");

      drawer.setAttribute(
        "aria-hidden",
        "false"
      );

    }, 300);

  }
);


/* =========================
   FRETE
========================= */

document
  .getElementById("calculateShipping")
  .addEventListener(
    "click",
    () => {

      const cep =
        document
          .getElementById("shippingCep")
          .value
          .trim();


      const result =
        document.getElementById(
          "shippingResult"
        );


      if (!cep) {

        result.textContent =
          "Digite um CEP válido.";

        return;

      }


      result.textContent =
        "Cálculo de frete será integrado posteriormente.";

    }
  );


/* =========================
   INICIAR
========================= */

updateCart();
