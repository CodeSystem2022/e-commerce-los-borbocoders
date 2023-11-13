//Valida si el carrito contiene productos.
function validateCart(cart) {
  if (Object.keys(cart).length === 0) {
    console.log("Aún no hay productos cargados");
    return false;
  } else {
    return true;
  }
}
//Valida si el valor ingresado en el campo de nombre es válido.

function validateFirstName() {
  const firstName = document.getElementById("first-name").value;
  return /^[A-Za-z]+$/.test(firstName);
}
//Valida si el valor ingresado en el campo de apellido es válido.
function validateLastName() {
  const lastName = document.getElementById("last-name").value;
  return /^[A-Za-z]+$/.test(lastName);
}
//Valida si el valor ingresado en el campo de correo electrónico es válido.

function validateEmail() {
  const email = document.getElementById("email").value;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
//Valida si el valor ingresado en el campo de dirección es válido.
function validateAddress() {
  const address = document.getElementById("address").value;
  return /^[A-Za-z0-9\s]+$/.test(address);
}
//Valida si el valor ingresado en el campo de número de teléfono es válido.
function validatePhone() {
  const phone = document.getElementById("phone").value;
  return /^[0-9]+$/.test(phone);
}
//Valida el formulario antes de enviarlo, mostrando alertas en caso de campos inválidos.

function validateForm(event) {
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isEmailValid = validateEmail();
  const isAddressValid = validateAddress();
  const isPhoneValid = validatePhone();

  if (!isFirstNameValid) {
    alert("Por favor, ingresa un nombre válido.");
    event.preventDefault();
  } else if (!isLastNameValid) {
    alert("Por favor, ingresa un apellido válido.");
    event.preventDefault();
  } else if (!isEmailValid) {
    alert("Por favor, ingresa un correo electrónico válido.");
    event.preventDefault();
  } else if (!isAddressValid) {
    alert("Por favor, ingresa una dirección válida.");
    event.preventDefault();
  } else if (!isPhoneValid) {
    alert("Por favor, ingresa un número de teléfono válido.");
    event.preventDefault();
  }
  // Devolver el resultado de la validación del formulario
  if (
    !isFirstNameValid ||
    !isLastNameValid ||
    !isEmailValid ||
    !isAddressValid ||
    !isPhoneValid
  ) {
    return false;
  } else {
    return true;
  }
}
// Exportar las funciones de validación para su uso en otros módulos

export { validateCart, validateForm };

