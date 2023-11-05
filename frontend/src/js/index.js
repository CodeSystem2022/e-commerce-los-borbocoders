const shopContent = document.getElementById("shopContent");
const cart = JSON.parse(localStorage.getItem("carrito")) || [];


productos.forEach((product) => {
    const content = document.createElement("div");
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.productName}</h3>
    <p>${product.price} $</p>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Agregar al carrito";

    content.append(buyButton);

    buyButton.addEventListener("click", () => {
        //para que no se repita el producto
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);
        if (repeat) {
            cart.map((prod) => {
                if (prod.id === product.id) {
                    prod.quanty++
                    saveLocal();
                    displayCartCounter();
                    
                }
            })
        } else {
            cart.push({
                id: product.id,
                productName: product.productName,
                price: product.price,
                quanty: product.quanty,
                img: product.img,
            });
            saveLocal();
            displayCartCounter();

            
        }

          
     
    });
});


const titulo = document.createElement("h2");
titulo.innerHTML = `<h2 class="titulo-promo" id="promo">Promociones!!</h2>`;
shopContent.append(titulo);
promociones.forEach((product) => {
    const content = document.createElement("div");
    
    content.innerHTML = ` 
    <img src="${product.img}">
    <h3>${product.productName}</h3>
    <div class"precio-promo>
    <p  style="text-decoration: line-through; color: red; ">${product.promo} $</p>
    <p>${product.price} $</p>
    </div>
       `;
  
  shopContent.append(content);

  const buyButton = document.createElement("button");
  buyButton.innerText = "Agregar al carrito";

  content.append(buyButton);

  buyButton.addEventListener("click", () => {
    //para que no se repita el producto
    const repeat = cart.some(
      (repeatProduct) => repeatProduct.id === product.id
    );
    if (repeat) {
      cart.map((prod) => {
        if (prod.id === product.id) {
          prod.quanty++;
          saveLocal();
          displayCartCounter();
        }
      });
    } else {
      cart.push({
        id: product.id,
        productName: product.productName,
        price: product.price,
        quanty: product.quanty,
        img: product.img,
      });
      saveLocal();
      displayCartCounter();
    }
  });
});


//set item
const saveLocal = () => {

    localStorage.setItem("carrito", JSON.stringify(cart));
}
//get item
JSON.parse(localStorage.getItem("carrito"))

