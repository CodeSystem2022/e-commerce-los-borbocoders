// Obtiene referencias a elementos del DOM
const deleteProductButton = document.getElementById("cart");
const productList = document.getElementById("products");
const cartList = document.querySelector("#cart-list tbody");
const emptyCartButton = document.getElementById("empty-cart");
const goToCheckout = document.getElementById("checkoutLink");
const cart = [];

// Función para inicializar el carrito
async function onInitCart(path) {
   // Si hay datos en el carrito almacenados localmente, mostrarlos
  if (getCartFromLocalStorage() != null) {
    const cartData = getCartFromLocalStorage();
    displayCart(cartData);
  }
}

// Función para agregar un producto al carrito
function addProduct(event) {
  event.preventDefault();
  // Verifica si el elemento clickeado tiene la clase "agregar-carrito"
  if (event.target.classList.contains("agregar-carrito")) {
    // Obtener información del producto desde el DOM
    const product = event.target.closest(".product");
    const productId = product.querySelector("a").getAttribute("product-id");
    const productName = product.querySelector("h3").textContent;
    const description = product.querySelector("p").textContent;
    const price = product.querySelector("#price").getAttribute("value");
    const category = product.querySelector("#price").getAttribute("value");
    const imageSource = product.querySelector("img").getAttribute("s");
    // Crea objeto con la información del producto
    const productToAdd = {
      productId,
      productName,
      description,
      price,
      category,
      imageSource,
      quantity: 1,
    };

    console.log(productToAdd);
    // Verifica si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(
      (product) => product.productId === productToAdd.productId
    );
    // Actualiza la cantidad si el producto ya está en el carrito, o agregarlo
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(productToAdd);
    }
    // Guarda el carrito en el almacenamiento local
    saveCartToLocalStorage(cart);
    // Agrega el producto al carrito visualmente
    addToCart(productToAdd);
  }
}
// Función para agregar un producto al carrito visualmente
function addToCart(product) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
        <img src="${product.imageSource}" width=100>
    </td>
    <td>
        ${product.productName}
    </td>
    <td>
        ${product.price}
    </td>
    <td>
        <a href="#" class="delete" id="delete-btn" productId="${product.productId}"> X </a> 
    </td>        
`;

  cartList.appendChild(row);
}

// Función para mostrar los productos del carrito
function displayCart(products) {
  cartList.innerHTML = "";

  for (const product of products) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${product.imageSource}" width=100>
        </td>
        <td>
            ${product.productName}
        </td>
        <td>
            ${product.price}
        </td>
        <td>
            <a href="#" class="delete" id="delete-btn" productId="${product.productId}">X </a> 
        </td>        
    `;

    cartList.appendChild(row);
  }
}
// Función para eliminar un producto del carrito
function deleteProduct(event) {
  event.preventDefault();
  // Obtiene el ID del producto a eliminar
  const productId = document
    .getElementById("delete-btn")
    .getAttribute("productId");
  // Obtiene y actualiza el carrito desde el almacenamiento local
  const cartData = getCartFromLocalStorage();
  const updatedCart = cartData.filter(
    (product) => product.productId !== productId
  );
  // Guarda el carrito actualizado en el almacenamiento local
  saveCartToLocalStorage(updatedCart);
  // Actualiza visualmente el carrito
  addToCart(updatedCart);
  displayCart(updatedCart);
}
// Función para vaciar completamente el carrito
function emptyCart() {
  // Limpiar el almacenamiento local y la representación visual del carrito
  localStorage.clear();

  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }
  return false;
}
// Función para guardar el carrito en el almacenamiento local
function saveCartToLocalStorage(cartData) {
  localStorage.setItem("cart", JSON.stringify(cartData));
  // Guardar el total del carrito en el almacenamiento local
  saveTotalToLocalStorage();
}
// Función para guardar el total del carrito en el almacenamiento local
function saveTotalToLocalStorage() {
  // Calcula el total sumando el precio de cada producto multiplicado por su cantidad
  const total = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  // Guarda el total en el almacenamiento local
  localStorage.setItem("total", JSON.stringify(total));
}
// Función para obtener el carrito desde el almacenamiento local
function getCartFromLocalStorage() {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}
// Función para obtener el total del carrito desde el almacenamiento local
function getTotalFromLocalStorage() {
  const total = localStorage.getItem("total");
  return total ? JSON.parse(total) : 0;
}
// Exporta funciones relevantes
export {
  addProduct,
  onInitCart,
  getCartFromLocalStorage,
  getTotalFromLocalStorage,
};
