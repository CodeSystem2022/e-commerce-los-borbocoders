// Importa la función getProducts desde el módulo data.js
import { getProducts } from "./services/data.js";

// Función para inicializar productos en la página web
export async function onInitProducts() {
  // Obtiene el elemento contenedor de la lista de productos desde el DOM
  const productList = document.getElementById("product");
  // Inicializa un array para almacenar los productos recuperados
  let products = [];

  try {
    // Intenta obtener productos utilizando la función getProducts
    products = await getProducts();
  } catch (error) {
    console.log(error);
  }
  // Limpia el contenido existente del contenedor de la lista de productos
  productList.innerHTML = "";
  // Itera a través del array de productos y crear elementos HTML para cada uno
  products.forEach((product) => {
    // Genera la URL de origen de la imagen basada en el ID del producto
    const imageSource = `../images/img-${product.product_id}.png`;
    // Crea elementos HTML para cada producto
    const productDiv = document.createElement("div");
    const productImg = document.createElement("img");
    const productName = document.createElement("h3");
    const productDescription = document.createElement("p");
    const productPrice = document.createElement("p");
    const productQuantity = document.createElement("p");
    const productAction = document.createElement("a");
    // Agrega una clase CSS al contenedor div del producto
    productDiv.classList.add("product");

    // Establece la fuente de la imagen y el atributo para la imagen del producto
    productImg.src = imageSource;
    productImg.setAttribute("s", imageSource);
    // Establece IDs y contenido para otros detalles del producto
    productName.id = "product-name";
    productName.innerHTML = product.product_name;
    productDescription.id = "product-description";
    productDescription.innerHTML = product.description;
    productQuantity.id = "product-quantity";
    productQuantity.innerHTML = `Unidades Disponibles: ${product.stock_quantity}`;
    productPrice.id = "price";
    productPrice.setAttribute("value", product.price);
    productPrice.innerHTML = `Precio: $ ${product.price}`;
    // Establece atributos y contenido para el enlace de acción del producto
    productAction.href = "#";
    productAction.setAttribute("product-id", product.product_id);
    productAction.innerHTML = "Agregar al Carrito";
    productAction.className = "agregar-carrito btn-2";

    // Adjunta los elementos creados al contenedor div del producto
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productImg);
    productDiv.appendChild(productQuantity);
    productDiv.appendChild(productAction);

    // Adjunta el contenedor div del producto al contenedor de la lista de productos
    productList.appendChild(productDiv);
  });
}
