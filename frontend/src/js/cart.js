const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
/*Captura id del boton*/
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";
    //modal Header
    const modalHeader = document.createElement("div");
    
    const modalClose = document.createElement("div");
    modalClose.innerText = "X";
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    })
        
    const modalTitle = document.createElement("div");
    modalTitle.innerText = "CARRITO";
    modalTitle.className = "modal-title"
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    //modal body (mostrar productos)
    if (cart.length > 0) {

        cart.forEach((product) => {
            const modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.innerHTML = `
        <div class="producto">
            <img class="producto-img" src="${product.img}">
            <div class="producto-info">
                <h4>${product.productName}</h4>
            </div>
            <div class="quantity">
                <span class="quantity-btn-decrese">-</span>
                <span class="quantity-input">${product.quanty}</span>
                <span class="quantity-btn-increse">+</span>
            </div>
            <div class="price">   ${product.price * product.quanty} $</div>
            <div class="delete-product">X</div>
        </div>
    `;
            modalContainer.append(modalBody);

            //Para que funcione el boton - del carrito
            const decrese = modalBody.querySelector(".quantity-btn-decrese");
            decrese.addEventListener("click", () => {
                if (product.quanty !== 1) {
                    product.quanty--;
                    saveLocal();
                    displayCart();  
                    displayCartCounter();
                }
            });

            //Para que funcione el boton + del carrito
            const increse = modalBody.querySelector(".quantity-btn-increse");
            increse.addEventListener("click", () => {
                product.quanty++;
                saveLocal();
                displayCart();
                displayCartCounter();
            });
        
            //eliminar producto
            const deleteProduct = modalBody.querySelector(".delete-product");
            deleteProduct.addEventListener("click", () => {
                deleteCartProduct(product.id);
            })
        });

        //MODAL FOOTER
        //calcular total
        const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0)


        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        modalFooter.innerHTML = `¨
    <div class="total-price">Total = $ ${total}</div>
    <button class="btn-primary" id="checkout-btn">COMPRAR</button>
    <div id="button-checkout"></div>
    `;
        modalContainer.append(modalFooter);
       // mercado pago
        const mercadopago = new MercadoPagoResponse(
          "TEST-e955a72e-b3ec-4cf1-bb42-0b46904581a5",
          {
            locale: "es-AR",
          }
        );

        const checkoutButton = modalFooter.querySelector("#checkout-btn");

        checkoutButton.addEventListener("click", function () {
            checkoutButton.remove();

            const orderData = {
                quantity: 1,
                description: "Tu compra",
                price: total,

            };

            fetch("http://localhost:8080/create_preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (preference) {
                    createCheckoutButton(preference.id)
                })
                .catch(function () {
                    alert("Unexpected error")
                });
        });

        function createCheckoutButton(preferenceId) {
            const bricksBuilder = mercadopago.bricks();

            const renderComponent = async (bricksBuilder) => {
                await bricksBuilder.create(
                    "wallet",
                    "button-checkout",
                    {
                        initialization: {
                            preferenceId: preferenceId,
                        },
                        callbacks: {
                            onError: (error) => console.error(error),
                            onReady: () => { },
                        },
                    }
                );
            };
            window.checkoutButton = renderComponent(bricksBuilder);
        }


    } else {
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerText = " El carrito esta vacío";
        modalContainer.append(modalText);
}
};

cartBtn.addEventListener("click", displayCart);

//funcion para eliminar productos
const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    cart.splice(foundId, 1);
    saveLocal();
    displayCart();
    displayCartCounter();
}

//contador de productos
const displayCartCounter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
    if (cartLength > 0) {
        cartCounter.style.display = "block";
        localStorage.setItem("cartLength", JSON.stringify(cartLength));
        cartCounter.innerText = JSON.parse(localStorage.getItem("cartLength"));
        
    } else {
        cartCounter.style.display = "none";
    }
};
displayCartCounter();