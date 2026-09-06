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
    category: "mouses",
    price: 1349.91,
    desc: "Leve, preciso e com acabamento monocromático.",
    initial: "B",
    brand: "WLMouse",
    image: "imagens1/beast1.webp",
    imageHover: "imagens1/beastblue.webp",
    gallery: [
      "imagens1/beast1.webp",
      "imagens1/beastblue.webp"
    ]
  },

  {
    id: 2,
    name: "ATK Ghost Extreme Carbon Fiber",
    category: "mouses",
    price: 989.91,
    desc: "Design enxuto para performance e controle.",
    initial: "A",
    brand: "ATK",
    image: "imagens1/atkghost.webp",
    imageHover: "imagens1/atkghost2.webp",
    gallery: [
      "imagens1/atkghost.webp",
      "imagens1/atkghost2.webp"
    ]
  },

  {
    id: 3,
    name: "Aspas RS6 Ultra HE",
    category: "teclados",
    price: 1889.91,
    desc: "Formato compacto com aparência premium.",
    initial: "A",
    brand: "ATK",
    image: "imagens1/aspasrs6.webp",
    imageHover: "imagens1/aspasrs61.webp",
    gallery: [
      "imagens1/aspasrs6.webp",
      "imagens1/aspasrs61.webp",
      "imagens1/aspasrs62.webp",
      "imagens1/aspasrs63.webp"
    ]
  },

  {
    id: 4,
    name: "ATK RS6 Air",
    category: "teclados",
    price: 701.91,
    desc: "Visual limpo com teclas de alta resposta.",
    initial: "R",
    brand: "ATK",
    image: "imagens1/rs7air.webp",
    imageHover: "imagens1/rs6air3.webp",
    gallery: [
      "imagens1/rs7air.webp",
      "imagens1/rs6air3.webp"
    ]
  },

  {
    id: 5,
    name: "Artisan FX Hien XXL",
    category: "mousepads",
    price: 602.91,
    desc: "Base estável, textura suave e grande área útil.",
    initial: "H",
    brand: "Artisan",
    image: "imagens1/artisanhienblue.webp",
    imageHover: "imagens1/hienblack.webp",
    gallery: [
      "imagens1/artisanhienblue.webp",
      "imagens1/hienblack.webp"
    ]
  },

  {
    id: 6,
    name: "Artisan FX Zero XXL",
    category: "mousepads",
    price: 683.91,
    desc: "Deslize rápido com acabamento minimalista.",
    initial: "Z",
    brand: "Artisan",
    image: "imagens1/artisanfxzero.jpg",
    imageHover: "imagens1/artizanzeroorange.jpg",
    gallery: [
      "imagens1/artisanfxzero.jpg",
      "imagens1/artizanzeroorange.jpg"
    ]
  },

  {
    id: 7,
    name: "Mchose V9 Pro",
    category: "audio",
    price: 450.91,
    desc: "Som limpo e visual discreto para o setup.",
    initial: "M",
    brand: "Mchose",
    image: "imagens1/mchosev9pro.png",
    imageHover: "imagens1/mchosev9pro2.webp",
    gallery: [
      "imagens1/mchosev9pro.png",
      "imagens1/mchosev9pro2.webp",
      "imagens1/mchosev9pro3.webp"
    ]
  },

  {
    id: 8,
    name: "Manguito Talon Games",
    category: "manguitos",
    price: 119.91,
    desc: "Manguito confortável e design moderno.",
    initial: "M",
    brand: "TalonGames",
    image: "imagens1/manguito1.png",
    imageHover: "imagens1/manguitotalongames1.png",
    gallery: [
      "imagens1/manguito1.png",
      "imagens1/manguitotalongames1.png"
    ]
  },

  {
    id: 9,
    name: "Feets Universais",
    category: "feets",
    price: 87.91,
    desc: "Feets Universais Speed.",
    initial: "F",
    image: "imagens1/feets.png",
    gallery: [
      "imagens1/feets.png"
    ]
  },

  {
    id: 10,
    name: "NemVira Doll",
    category: "mousepads",
    price: 340.91,
    desc: "NemVira Doll é um mousepad de tecido extremamente raro, feito para quem busca algo diferente e difícil de encontrar.",
    initial: "D",
    brand: "NemVira",
    image: "imagens1/nemviradollmain.jfif",
    imageHover: "imagens1/nemviradoll.jfif",
    gallery: [
      "imagens1/nemviradollmain.jfif",
      "imagens1/nemviradoll.jfif",
      "imagens1/nemviradoll1.jfif"
    ]
  },

  {
    id: 11,
    name: "SAYO Glass",
    category: "glasspads",
    price: 851.91,
    desc: "O Dysphoria Sayo Glass Pad é um mousepad de vidro desenvolvido com foco em velocidade, utilizando uma construção fina e uma superfície micro-coated especialmente desenvolvida para proporcionar um deslize rápido, suave e consistente. O Sayo combina uma superfície orientada para velocidade com uma construção de baixo perfil, oferecendo baixa resistência durante a movimentação do mouse.",
    initial: "S",
    brand: "DYSPHORIA",
    image: "imagens1/sayoglass.webp",
    imageHover: "imagens1/sayoglass2.webp",
    gallery: [
      "imagens1/sayoglass.webp",
      "imagens1/sayoglass2.webp"
    ],
    galleryScales: [1, 1.4]
  },

  {
    id: 12,
    name: "Kokū — The Void Glass Edition",
    category: "glasspads",
    price: 976.91,
    desc: "Nomeado a partir do conceito japonês de void and open sky,   Kokū - The Void não é apenas um glasspad. É uma declaração. Uma superfície de vidro de edição limitada feita para quem exige precisão sem compromissos e beleza sem ruído.",
    initial: "K",
    brand: "MITSUKI",
    image: "imagens1/koku.webp",
    imageHover: "imagens1/koku2.webp",
    gallery: [
      "imagens1/koku.webp",
      "imagens1/koku2.webp"
    ]
  },

  {
    id: 13,
    name: "OP1w 4K v2",
    category: "mouses",
    price: 854.91,
    desc: "O Endgame Gear OP1w 4K V2 foi projetado para entregar resposta ultrarrápida, construção robusta e controle preciso, atendendo tanto jogadores casuais quanto profissionais.",
    initial: "O",
    brand: "Endgame Gear",
    image: "imagens1/op1wv2.webp",
    imageHover: "imagens1/op1wv22.webp",
    gallery: [
      "imagens1/op1wv2.webp",
      "imagens1/op1wv22.webp",
      "imagens1/op1wv23.webp"
    ]
  },

  {
    id: 14,
    name: "ATK RS6+",
    category: "teclados",
    price: 776.91,
    desc: "A evolução da Série RS une armadura mecha totalmente transparente com precisão de elite. Impulsionada pela solução Blazing Wind ULTRA da Gen-3, esta série entrega resposta instantânea e precisão cirúrgica. Com 5-Layer Acoustic Padding e Frosted-Top Keycaps, ela é meticulosamente ajustada para um som HiFi puro e uma experiência tátil refinada.",
    initial: "R",
    brand: "ATK",
    image: "imagens1/rs6plus1.webp",
    imageHover: "imagens1/ras6plus.webp",
    gallery: [
      "imagens1/rs6plus1.webp",
      "imagens1/ras6plus.webp",
      "imagens1/rs6plus6.webp",
      "imagens1/rs6plus3.webp",
      "imagens1/rs6pluspink.webp",
      "imagens1/rs6plus4.webp"
    ]
  },

  {
    id: 15,
    name: "真夜Mayo",
    category: "glasspads",
    price: 754.91,
    desc: "Superfície revestida de nano proporciona um deslize ultra suave com movimentos rápidos e responsivos. Um feedback sutil na superfície ajuda a manter o controle preciso em cada movimento.",
    initial: "M",
    brand: "TalonGames",
    image: "imagens1/mayo1.webp",
    imageHover: "imagens1/mayo2.jpg",
    gallery: [
      "imagens1/mayo1.webp",
      "imagens1/mayo2.jpg",
      "imagens1/mayo3.webp"
    ]
  },

  {
    id: 16,
    name: "Mercury V60 Pro Deluxe Edition ",
    category: "teclados",
    price: 1237.91,
    desc: "Projetado para precisão de 0,005 mm com profundidade de disparo ajustável (0,005 mm–3,5 mm) para eliminar o atraso e melhorar o controle.",
    initial: "M",
    brand: "GravaStar",
    image: "imagens1/mercuryv60pro.webp",
    imageHover: "imagens1/mercuryv60pro2.webp",
    gallery: [
      "imagens1/mercuryv60pro.webp",
      "imagens1/mercuryv60pro2.webp"
    ]
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
