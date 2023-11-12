// Importa la función loadEvents desde el módulo cart.js
import { loadEvents } from "./cart.js";
// Importa la función onInitProducts desde el módulo products.js
import { onInitProducts } from "./products.js";
// Importa la función onInitCart desde el módulo cart.js
import { onInitCart } from "./cart.js";

// Función asíncrona para inicializar la aplicación
export async function onInit() {
  // Inicializa la sección de productos
  onInitProducts();
  // Inicializa el carrito en la sección principal del documento HTML
  onInitCart("main");
}

// Guarda un objeto "cart" en el almacenamiento local (localStorage)
localStorage.setItem("carrito", JSON.stringify(cart));

// Obtene el objeto "carrito" del almacenamiento local y convertirlo de nuevo a un objeto JavaScript
JSON.parse(localStorage.getItem("carrito"));
