import { createPreferenceId } from "./mercadoPago.js";
import { saveOrder } from "./data.js";

const checkoutProducts = document.getElementById("checkout-products");
const totalPrice = document.getElementById("total-price");

function onInitCheckout() {

    checkoutProducts.innerHTML = '';
    const cartData = localStorage.getItem('cart');
    const cartArray = JSON.parse(cartData);

    cartArray.forEach((product) => {
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
    
    const total = cartArray.reduce((total, product) => total + product.price * product.quantity, 0);

    totalPrice.innerText = `Total $ ${total}`;

    
    // actions
    const cashContainer = document.getElementById('cash-container');
    const walletContainer = document.getElementById('wc');
    const mercadoPagoRadio = document.getElementById("mercadoPago");
    const cashRadio = document.getElementById("cash");
    const buttonSubmit = document.createElement('button');
    //buttonSubmit.textContent='Continuar';

    buttonSubmit.innerHTML = 'Continuar';
    buttonSubmit.addEventListener('click', onCashsubmit);    
    cashContainer.appendChild(buttonSubmit);
    
    // Add event listeners to the radio buttons
    mercadoPagoRadio.addEventListener("click", function (event) {
    if (mercadoPagoRadio.checked) {
        cashContainer.innerHTML = '';
        onsubmit(event);
    }
    });

    cashRadio.addEventListener("click", function (event) {
    if (cashRadio.checked) {
        walletContainer.innerText = '';
        buttonSubmit.innerHTML = 'Continuar';
        buttonSubmit.addEventListener('click', onCashsubmit);    
        cashContainer.appendChild(buttonSubmit);
        }
    });

    

}

function onsubmit(event) {
    const cartData = localStorage.getItem('cart');
    const cart = JSON.parse(cartData);
    const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const payment = 'm';

    const order = {
        order: {
            customer: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                phone: phone,
            },
            cart,
            total,
            payment,
        }
    }
    
    createPreferenceId(order);
    
}

async function onCashsubmit(event) {
    const cartData = localStorage.getItem('cart');
    const cart = JSON.parse(cartData);
    const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const payment = 'c';
    
    const order = {
        order: {
            customer: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                phone: phone,
            },
            cart,
            total,
            payment
        }
    }
    
    try {
        const response = await saveOrder(order);
        if(response) {
            const orderId = response.order_id;
            localStorage.setItem('orderId', orderId);
            window.location.href = '../../templates/success-payment-cash.html';
        }
    } catch (error) {
        console.error('The order could not be saved, try again later');
    }
    
}

export { onInitCheckout };