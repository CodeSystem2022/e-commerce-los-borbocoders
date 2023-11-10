import { getProducts } from "./services/data.js";

export async function onInitProducts() {
  const productList = document.getElementById("product");

  let products = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.log(error);
  }

  productList.innerHTML = "";
  products.forEach((product) => {
    const imageSource = `../images/img-${product.product_id}.png`;
    const productDiv = document.createElement("div");
    const productImg = document.createElement("img");
    const productName = document.createElement("h3");
    const productDescription = document.createElement("p");
    const productPrice = document.createElement("p");
    const productQuantity = document.createElement("p");
    const productAction = document.createElement("a");

    productDiv.classList.add("product");
    productImg.src = imageSource;
    productImg.setAttribute("s", imageSource);
    productName.id = "product-name";
    productName.innerHTML = product.product_name;
    productDescription.id = "product-description";
    productDescription.innerHTML = product.description;
    productQuantity.id = "product-quantity";
    productQuantity.innerHTML = `Unidades Disponibles: ${product.stock_quantity}`;
    productPrice.id = "price";
    productPrice.setAttribute("value", product.price);
    productPrice.innerHTML = `Precio: $ ${product.price}`;
    productAction.href = "#";
    productAction.setAttribute("product-id", product.product_id);
    productAction.innerHTML = "Agregar al Carrito";
    productAction.className = "agregar-carrito btn-2";

    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productImg);
    productDiv.appendChild(productQuantity);
    productDiv.appendChild(productAction);

    productList.appendChild(productDiv);
  });
}

