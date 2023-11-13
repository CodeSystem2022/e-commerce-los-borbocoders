import { createPreference } from "./data.js";
//Crea un ID de preferencia de pago utilizando la función de creación de preferencias.
async function createPreferenceId(order) {
    
    try {
      // Obtener el ID de preferencia utilizando la función de creación de preferencias
      const preferenceId = await createPreference(order);
      // Verificar si se recibió un ID de preferencia del servidor
        if (preferenceId) {
          // Crear el botón de MercadoPago utilizando el ID de preferencia
          createMercadoPagoButton(preferenceId);
        } else {
        console.error("No preferenceId received from the server.");
      }
    } catch (error) {
        console.error('Error while getting preferenceId:', error);
    }

}
//Crea y configura el botón de pago de MercadoPago.
async function createMercadoPagoButton(preferenceId) {
  // Configurar MercadoPago con la clave de prueba
  const mp = new MercadoPago("TEST-ea76c462-7363-4745-b32c-555a9663d47a");
  const bricksBuilder = mp.bricks();
  // Crear el botón de pago de MercadoPago en el contenedor especificado
  bricksBuilder.create("wallet", "wallet_container", {
    initialization: {
      preferenceId: preferenceId,
    },
  });
}

export { createPreferenceId };
