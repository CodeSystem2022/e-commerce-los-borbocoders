import { loadEvents } from "./cart.js";
import { onInitProducts } from "./products.js";
import { onInitCart } from "./cart.js";

export async function onInit() {
  onInitProducts();
  onInitCart("main");
}
