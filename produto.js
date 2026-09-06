const productData = localStorage.getItem("klyxSelectedProduct");

if (!productData) {
  window.location.href = "index.html#produtos";
}

const product = JSON.parse(productData);

const mainImage = document.getElementById("productMainImage");
const thumbnails = document.getElementById("productThumbnails");

const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");

const breadcrumbCategory =
  document.getElementById("breadcrumbCategory");

const breadcrumbProduct =
  document.getElementById("breadcrumbProduct");

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

breadcrumbCategory.textContent =
  product.category.charAt(0).toUpperCase() +
  product.category.slice(1);

breadcrumbProduct.textContent =
  product.name;

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

const galleryScales =
  product.galleryScales || [];

gallery.forEach((imageSrc, index) => {

  /* IMAGEM PRINCIPAL */

  if (index === 0) {
  const image = document.createElement("img");
  image.src = imageSrc;
  image.alt = product.name;

  const scale = galleryScales[index] || 1;
  image.style.transform = `scale(${scale})`;

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

  const currentImage = mainImage.querySelector("img");

  if (!currentImage) return;

  currentImage.style.opacity = "0";

  setTimeout(() => {

    currentImage.src = imageSrc;

const scale = galleryScales[index] || 1;
currentImage.style.transform = `scale(${scale})`;

currentImage.onload = () => {
  currentImage.style.opacity = "1";
};

  }, 180);


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
   FINALIZAR PEDIDO
========================= */

if (checkoutButton) {

  checkoutButton.addEventListener("click", () => {

    const cart = getCart();

    if (!cart.length) {
      alert("Seu carrinho está vazio.");
      return;
    }

    let message = "🛒 *Pedido via Loja Online* %0A%0A";

    cart.forEach(item => {

      message +=
        `• ${item.name} %0A` +
        `   Quantidade: ${item.quantity}x %0A` +
        `   Preço unitário: ${money(item.price)} %0A%0A`;

    });

    const total = cart.reduce(
      (sum, item) =>
        sum + Number(item.price) * Number(item.quantity),
      0
    );

    message +=
      `💰 *Total:* ${money(total)} %0A%0A`;

    message +=
      "📦 Por favor, confirme o endereço de entrega.";

    const whatsappNumber = "5531972247548";

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");

  });

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

   document.documentElement.style.overflow = "hidden";
   document.body.style.overflow = "hidden";

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

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";

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

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

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



 /* =========================
    PRODUTOS RELACIONADOS
 ========================= */

const relatedContainer =
  document.getElementById("relatedProducts");


const relatedProducts = [

  {
    id: 1,
    name: "Beast X Max",
    brand: "WLmouse",
    category: "mouses",
    price: 1349.91,
    image: "imagens1/beast1.webp",
    imageHover: "imagens1/beastblue.webp"
  },

  {
    id: 2,
    name: "ATK Ghost Extreme Carbon Fiber",
    brand: "ATK",
    category: "mouses",
    price: 989.91,
    image: "imagens1/atkghost.webp",
    imageHover: "imagens1/atkghost2.webp"
  },

  {
    id: 3,
    name: "Aspas RS6 Ultra HE",
    brand: "ATK",
    category: "teclados",
    price: 1889.91,
    image: "imagens1/aspasrs6.webp",
    imageHover: "imagens1/aspasrs61.webp"
  },

  {
    id: 4,
    name: "ATK RS6 Air",
    brand: "ATK",
    category: "teclados",
    price: 701.91,
    image: "imagens1/rs7air.webp",
    imageHover: "imagens1/rs6air3.webp"
  },

  {
    id: 5,
    name: "Artisan FX Hien XXL",
    brand: "Artisan",
    category: "mousepads",
    price: 602.91,
    image: "imagens1/artisanhienblue.webp",
    imageHover: "imagens1/hienblack.webp"
  },

  {
    id: 6,
    name: "Artisan FX Zero XXL",
    brand: "Artisan",
    category: "mousepads",
    price: 683.91,
    image: "imagens1/artisanfxzero.jpg",
    imageHover: "imagens1/artisanzeroorange.jpg"
  },

  {
    id: 7,
    name: "Mchose V9 Pro",
    brand: "Mchose",
    category: "audio",
    price: 450.91,
    image: "imagens1/mchosev9pro.png",
    imageHover: "imagens1/mchosev9pro2.webp"
  },

  {
    id: 10,
    name: "NemVira Doll",
    brand: "NemVira",
    category: "mousepads",
    price: 340.91,
    image: "imagens1/nemviradollmain.jfif",
    imageHover: "imagens1/nemviradoll.jfif"
  },

  {
    id: 11,
    name: "SAYO Glass",
    brand: "SAYO",
    category: "glasspads",
    price: 851.91,
    image: "imagens1/sayoglass.webp",
    imageHover: "imagens1/sayoglass2.webp"
  },

  {
    id: 12,
    name: "Kokū — The Void Glass Edition",
    brand: "Kokū",
    category: "glasspads",
    price: 976.91,
    image: "imagens1/koku.webp",
    imageHover: "imagens1/koku2.webp"
  },

  {
    id: 13,
    name: "OP1w 4K v2",
    brand: "Endgame Gear",
    category: "mouses",
    price: 854.91,
    image: "imagens1/op1wv2.webp",
    imageHover: "imagens1/op1wv22.webp"
  },

  {
    id: 14,
    name: "ATK RS6+",
    brand: "ATK",
    category: "teclados",
    price: 776.91,
    image: "imagens1/rs6plus1.webp",
    imageHover: "imagens1/ras6plus.webp"
  },

  {
    id: 15,
    name: "真夜Mayo",
    brand: "MAYO",
    category: "glasspads",
    price: 754.91,
    image: "imagens1/mayo1.webp",
    imageHover: "imagens1/mayo2.jpg"
  },

  {
    id: 16,
    name: "Mercury V60 Pro Deluxe Edition",
    brand: "Mercury",
    category: "teclados",
    price: 1237.91,
    image: "imagens1/mercuryv60pro.webp",
    imageHover: "imagens1/mercuryv60pro2.webp"
  }

];


function renderRelatedProducts() {

  if (!relatedContainer) return;


  const sameCategory =
    relatedProducts.filter(item =>
      item.category === product.category &&
      item.id !== product.id
    );


  const otherProducts =
    relatedProducts.filter(item =>
      item.category !== product.category &&
      item.id !== product.id
    );


  const selected =
    [...sameCategory, ...otherProducts].slice(0, 4);


  relatedContainer.innerHTML = "";


  selected.forEach(item => {

    const article =
      document.createElement("article");

    article.className = "product";


    article.addEventListener("click", () => {

      localStorage.setItem(
        "klyxSelectedProduct",
        JSON.stringify(item)
      );

      window.location.href =
        `produto.html?id=${item.id}`;

    });


    const thumb =
      document.createElement("div");

    thumb.className = "thumb";


    const image =
      document.createElement("img");

    image.src = item.image;
    image.alt = item.name;
    image.className = "product-image";


    thumb.appendChild(image);


    if (item.imageHover) {

      const hoverImage =
        document.createElement("img");

      hoverImage.src =
        item.imageHover;

      hoverImage.alt =
        item.name;

      hoverImage.className =
        "product-image-hover";

      thumb.appendChild(hoverImage);

    }


    const content =
      document.createElement("div");

    content.className = "content";


    const tag =
      document.createElement("div");

    tag.className = "tag";
    tag.textContent = item.brand;


    const name =
      document.createElement("h3");

    name.className = "name";
    name.textContent = item.name;


    const priceRow =
      document.createElement("div");

    priceRow.className = "price-row";


    const priceContainer =
      document.createElement("div");


    const price =
      document.createElement("div");

    price.className = "price";
    price.textContent =
      money(item.price);


    const installment =
      document.createElement("div");

    installment.className = "installment";

    installment.textContent =
      `10x de ${money(item.price / 10)} sem juros`;


    priceContainer.appendChild(price);
    priceContainer.appendChild(installment);

    priceRow.appendChild(priceContainer);


    content.appendChild(tag);
    content.appendChild(name);
    content.appendChild(priceRow);


    article.appendChild(thumb);
    article.appendChild(content);


    relatedContainer.appendChild(article);

  });

}


renderRelatedProducts();
