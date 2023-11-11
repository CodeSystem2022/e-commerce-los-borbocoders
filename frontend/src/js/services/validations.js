
function validateCart(cart) {
    if(Object.keys(cart).length === 0) {
        console.log('Aún no hay productos cargados');
        return false;
    } else {
        return true;
    }
}


function validateFirstName() {
    const firstName = document.getElementById("first-name").value;
    return /^[A-Za-z]+$/.test(firstName);
}

function validateLastName() {
    const lastName = document.getElementById("last-name").value;
    return /^[A-Za-z]+$/.test(lastName);
}

function validateEmail() {
    const email = document.getElementById("email").value;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateAddress() {
    const address = document.getElementById('address').value;
    return /^[A-Za-z0-9\s]+$/.test(address);
}

function validatePhone() {
    const phone = document.getElementById("phone").value;
    return /^[0-9]+$/.test(phone);
}

function validateForm(event) {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isAddressValid = validateAddress();
    const isPhoneValid = validatePhone();

    if (!isFirstNameValid) {
        alert('Por favor, ingresa un nombre válido.');
        event.preventDefault();
    } else if (!isLastNameValid) {
        alert('Por favor, ingresa un apellido válido.');
        event.preventDefault();
    } else if (!isEmailValid) {
        alert('Por favor, ingresa un correo electrónico válido.');
        event.preventDefault();
    } else if (!isAddressValid) {
        alert('Por favor, ingresa una dirección válida.');
        event.preventDefault();
    } else if (!isPhoneValid) {
        alert('Por favor, ingresa un número de teléfono válido.');
        event.preventDefault();
    }

    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isAddressValid || !isPhoneValid) {
        return false;
    } else {
        return true;
    }
}

export { validateCart, validateForm };