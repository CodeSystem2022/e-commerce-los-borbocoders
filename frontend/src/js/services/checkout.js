import { getCartFromLocalStorage, getTotalFromLocalStorage } from "../cart.js";
import { validateCart, validateForm } from "./validations.js";
import { saveOrder } from "./data.js";
import { createPreferenceId } from "./mercadoPago.js";


const checkoutProducts = document.getElementById("checkout-products");
const totalPrice = document.getElementById("total-price");
const cart = getCartFromLocalStorage();
const total = getTotalFromLocalStorage();

function onInitCheckout() {

    if(!validateCart(cart)) {
        return;
    }

    displayCartSummary();

    setupButtons();
}

function displayCartSummary() {

    checkoutProducts.innerHTML = '';
    totalPrice.innerText = `Total $ ${total}`;

    cart.forEach((product) => {
        const productDiv = document.createElement('div');
        const productImg = document.createElement('img');
        const productName = document.createElement('h3');
        const productDescription = document.createElement('p');
        const productPrice = document.createElement('p');

        productDiv.classList.add('product');
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

function setupButtons() {
    
    const mercadoPagoRadio = document.getElementById("mercadoPago");
    const cashRadio = document.getElementById("cash");

    mercadoPagoRadio.addEventListener("click", handlePayment);
    cashRadio.addEventListener("click", handlePayment);
    
    createCashPaymentSubmitButton();
}

function createCashPaymentSubmitButton() {

    document.getElementById('wallet_container').innerHTML = ''; 
    const cashContainer = document.getElementById('cash_container');
    const buttonSubmit = document.createElement('button');
    buttonSubmit.id = 'cashSubmit';
    buttonSubmit.innerHTML = 'Continuar';
    buttonSubmit.addEventListener('click', handleCashPayment);    
    cashContainer.appendChild(buttonSubmit);
}

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

async function handleMercadopagoPayment(event) {

    if(!validateForm(event)) {
        return;
    }

    const order = {
        order: {
          ...createOrder(),
          payment: "m",
        },
    };

    await createPreferenceId(order);    

}

async function handleCashPayment(event) {

    if(!validateForm(event)) {
        return;
    }

    const order = {
        order: {
          ...createOrder(),
          payment: "c",
        },
    };


    try {
        const response = await saveOrder(order); 
        if(response) {
            const orderId = response.order_id;
            localStorage.setItem('orderId', orderId);
            window.location.href = '../../templates/success-payment-cash.html';
        }
    } catch (error) {
        console.error('Eror: ', error);
        alert('La orden no pudo ser procesada, por favor, intenta nuevamente')
    }    

}

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

export { onInitCheckout };
