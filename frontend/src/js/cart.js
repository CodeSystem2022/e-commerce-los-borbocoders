const deleteProductButton = document.getElementById("cart");
const productList = document.getElementById("products");
const cartList = document.querySelector("#cart-list tbody");
const emptyCartButton = document.getElementById("empty-cart");
const goToCheckout = document.getElementById("checkoutLink");
const cart = [];

async function onInitCart(path) {
  loadEvents(path);

  if (getCartFromLocalStorage() != null) {
    const cartData = getCartFromLocalStorage();
    displayCart(cartData);
  }
}

function loadEvents(path) {
  deleteProductButton.addEventListener("click", deleteProduct);
  emptyCartButton.addEventListener("click", emptyCart);

  if (path === "main") {
    productList.addEventListener("click", addProduct);
    goToCheckout.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "./templates/checkout.html";
    });
  } else if (path === "products") {
    productList.addEventListener("click", addProduct);
    goToCheckout.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "./checkout.html";
    });
  } else {
    goToCheckout.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "./checkout.html";
    });
  }
}

function addProduct(event) {
  event.preventDefault();

  if (event.target.classList.contains("agregar-carrito")) {
    const product = event.target.closest(".product");
    const productId = product.querySelector("a").getAttribute("product-id");
    const productName = product.querySelector("h3").textContent;
    const description = product.querySelector("p").textContent;
    const price = product.querySelector("#price").getAttribute("value");
    const category = product.querySelector("#price").getAttribute("value");
    const imageSource = product.querySelector("img").getAttribute("s");

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

    const existingProductIndex = cart.findIndex(
      (product) => product.productId === productToAdd.productId
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(productToAdd);
    }

    saveCartToLocalStorage(cart);

    addToCart(productToAdd);
  }
}

// Creación de tabla para agregar elementos al carrito de compras

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

//Funciòn que nos permitirá eliminar productos del carrito

function deleteProduct(event) {
  event.preventDefault();

  const productId = document
    .getElementById("delete-btn")
    .getAttribute("productId");
  const cartData = getCartFromLocalStorage();
  const updatedCart = cartData.filter(
    (product) => product.productId !== productId
  );
  saveCartToLocalStorage(updatedCart);

  addToCart(updatedCart);
  displayCart(updatedCart);
}


//Función vaciar carrito
function emptyCart() {
  localStorage.clear();

  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }
  return false;
}

function saveCartToLocalStorage(cartData) {
  localStorage.setItem('cart', JSON.stringify(cartData));

  saveTotalToLocalStorage();
}

function saveTotalToLocalStorage() {

  const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  localStorage.setItem('total', JSON.stringify(total));
}

function getCartFromLocalStorage() {
      
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
}

function getTotalFromLocalStorage() {
  const total = localStorage.getItem('total');
  return total ? JSON.parse(total) : 0;
}

export { loadEvents, addProduct, onInitCart, getCartFromLocalStorage, getTotalFromLocalStorage };