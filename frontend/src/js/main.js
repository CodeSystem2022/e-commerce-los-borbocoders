
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


