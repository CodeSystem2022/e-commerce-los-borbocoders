import { createPreferenceId } from "./mercadoPago.js";
import { saveOrder } from "./data.js";

const checkoutProducts = document.getElementById("checkout-products");
const totalPrice = document.getElementById("total-price");
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('checkout-form');
    formulario.addEventListener('submit', function (event) {
        // Verifica cada campo del formulario y muestra un mensaje de error detallado si es necesario
        if (!validarNombre()) {
            alert('Por favor, ingresa un nombre válido (solo letras).');
            event.preventDefault();
        } else if (!validarApellido()) {
            alert('Por favor, ingresa un apellido válido (solo letras).');
            event.preventDefault();
        } else if (!validarEmail()) {
            alert('Por favor, ingresa un correo electrónico válido.');
            event.preventDefault();
        } else if (!validarDireccion()) {
            alert('Por favor, ingresa una dirección válida (letras y números).');
            event.preventDefault();
        } else if (!validarTelefono()) {
            alert('Por favor, ingresa un número de teléfono válido (solo números).');
            event.preventDefault();
        } else {
            // Si todos los campos son válidos, realiza el envío del formulario según el método de pago seleccionado
            if (document.getElementById("mercadoPago").checked) {
                onsubmit(event);
            } else {
                onCashsubmit(event);
            }
        }
    });

    function validarNombre() {
        const nombre = document.getElementById("first-name").value;
        // Si el nombre está vacío o no contiene solo letras, retorna falso
        return /^[A-Za-z]+$/.test(nombre);
    }

    function validarApellido() {
        const apellido = document.getElementById("last-name").value;
        // Si el apellido está vacío o no contiene solo letras, retorna falso
        return /^[A-Za-z]+$/.test(apellido);
    }

    function validarEmail() {
        const email = document.getElementById("email").value;
        // Utiliza una expresión regular para validar el formato del correo electrónico
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validarDireccion() {
        const direccion = document.getElementById('address').value;
        // Si la dirección está vacía o contiene caracteres no permitidos, retorna falso
        return /^[A-Za-z0-9\s]+$/.test(direccion);
    }

    function validarTelefono() {
        const telefono = document.getElementById("phone").value;
        // Si el teléfono está vacío o no contiene solo números, retorna falso
        return /^[0-9]+$/.test(telefono);
    }
});

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
