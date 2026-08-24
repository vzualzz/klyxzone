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

let quantity = 1;


const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });


/* INFORMAÇÕES */

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


/* IMAGEM */

if (product.image) {

  const image = document.createElement("img");

  image.src = product.image;
  image.alt = product.name;

  mainImage.appendChild(image);

  const thumbnail = document.createElement("button");

  thumbnail.className = "product-thumbnail active";

  const thumbnailImage =
    document.createElement("img");

  thumbnailImage.src = product.image;
  thumbnailImage.alt = product.name;

  thumbnail.appendChild(thumbnailImage);

  thumbnails.appendChild(thumbnail);

}


/* QUANTIDADE */

decreaseButton.addEventListener("click", () => {

  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity;
  }

});


increaseButton.addEventListener("click", () => {

  quantity++;

  quantityElement.textContent = quantity;

});


/* ADICIONAR AO CARRINHO */

addButton.addEventListener("click", () => {

  const cart =
    JSON.parse(localStorage.getItem("klyxCart")) || [];

  const existing =
    cart.find(item => item.id === product.id);

  if (existing) {

    existing.quantity += quantity;

  } else {

    cart.push({
      ...product,
      quantity
    });

  }

  localStorage.setItem(
    "klyxCart",
    JSON.stringify(cart)
  );

  addButton.textContent =
    "ADICIONADO AO CARRINHO ✓";

});


/* FRETE */

document
  .getElementById("calculateShipping")
  .addEventListener("click", () => {

    const cep =
      document.getElementById("shippingCep").value.trim();

    const result =
      document.getElementById("shippingResult");

    if (!cep) {

      result.textContent =
        "Digite um CEP válido.";

      return;

    }

    result.textContent =
      "Cálculo de frete será integrado posteriormente.";

  });
