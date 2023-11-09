import { loadEvents } from "./cart.js";
import { onInitProducts } from "./products.js";
import { onInitCart } from "./cart.js";

export async function onInit() {
  onInitProducts();
  onInitCart("main");
}

    localStorage.setItem("carrito", JSON.stringify(cart));
}
//get item
JSON.parse(localStorage.getItem("carrito"))

