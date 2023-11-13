import { getCartFromLocalStorage, getTotalFromLocalStorage } from "../cart.js";
import { validateCart, validateForm } from "./validations.js";
import { saveOrder } from "./data.js";
import { createPreferenceId } from "./mercadoPago.js";

// Obtener referencias a elementos del DOM
const checkoutProducts = document.getElementById("checkout-products");
const totalPrice = document.getElementById("total-price");
const cart = getCartFromLocalStorage();
const total = getTotalFromLocalStorage();
// Función principal que se ejecuta al iniciar el proceso de pago
function onInitCheckout() {
  // Validar el carrito antes de continuar
  if (!validateCart(cart)) {
    return;
  }
  // Mostrar un resumen del carrito
  displayCartSummary();
  // Configurar los botones de pago
  setupButtons();
}
// Muestra un resumen del carrito en la página de pag
function displayCartSummary() {
  checkoutProducts.innerHTML = "";
  totalPrice.innerText = `Total $ ${total}`;
  // Recorre los productos en el carrito y mostrar su información
  cart.forEach((product) => {
    const productDiv = document.createElement("div");
    const productImg = document.createElement("img");
    const productName = document.createElement("h3");
    const productDescription = document.createElement("p");
    const productPrice = document.createElement("p");

    productDiv.classList.add("product");
    productImg.src = product.imageSource;
    productName.innerHTML = product.productName;
    productDescription.innerHTML = product.description;
    productPrice.id = "price";
    productPrice.innerHTML = `Precio: $ ${product.price}`;

    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productImg);

    checkoutProducts.appendChild(productDiv);
  });
}
// Configura los eventos de los botones de pago
function setupButtons() {
  const mercadoPagoRadio = document.getElementById("mercadoPago");
  const cashRadio = document.getElementById("cash");
  // Asigna manejadores de eventos a los botones
  mercadoPagoRadio.addEventListener("click", handlePayment);
  cashRadio.addEventListener("click", handlePayment);
  // Crea un botón de pago en efectivo
  createCashPaymentSubmitButton();
}
// Crea un botón para el pago en efectivo
function createCashPaymentSubmitButton() {

    document.getElementById('wallet_container').innerHTML = ''; 
    const cashContainer = document.getElementById('cash_container');
    const buttonSubmit = document.createElement('button');
    buttonSubmit.id = 'cashSubmit';
    buttonSubmit.innerHTML = 'Continuar';
    buttonSubmit.addEventListener('click', handleCashPayment);    
    cashContainer.appendChild(buttonSubmit);
}
// Maneja el evento de selección de método de pago
function handlePayment(event) {

    const selectedPaymentMethod = document.querySelector('input[name=paymentMethod]:checked').value;

    if (selectedPaymentMethod === 'cash') {
        createCashPaymentSubmitButton();

    } else if (selectedPaymentMethod === 'mercadopago') {
        document.getElementById('wallet_container').innerHTML = ''; 
        const cashContainer = document.getElementById('cash_container');
        const buttonSubmit = document.getElementById('cashSubmit');
        cashContainer.removeChild(buttonSubmit);
        handleMercadopagoPayment(event);
    }
}
// Maneja el proceso de pago con MercadoPago
async function handleMercadopagoPayment(event) {
  // Valida el formulario antes de continuar
  if (!validateForm(event)) {
    return;
  }
  // Crear un objeto de orden y obtener el ID de preferencia de MercadoPago

  const order = {
    order: {
      ...createOrder(),
      payment: "m",
    },
  };

  await createPreferenceId(order);
}
// Maneja el proceso de pago en efectivo
async function handleCashPayment(event) {
  // Valida el formulario antes de continuar
  if (!validateForm(event)) {
    return;
  }
  // Crea un objeto de orden y guardar la orden en la base de datos
  const order = {
    order: {
      ...createOrder(),
      payment: "c",
    },
  };

  try {
    const response = await saveOrder(order);
    if (response) {
      const orderId = response.order_id;
      localStorage.setItem("orderId", orderId);
      window.location.href = "../../templates/success-payment-cash.html";
    }
  } catch (error) {
    console.error("Eror: ", error);
    alert("La orden no pudo ser procesada, por favor, intenta nuevamente");
  }
}
// Crea un objeto de orden con la información del formulario
function createOrder() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
  
    return {
      customer: {
        firstName,
        lastName,
        email,
        address,
        phone,
      },
      cart: cart,
      total: total,
    };
}
// Exportar la función principal para iniciar el proceso de pago
export { onInitCheckout };
