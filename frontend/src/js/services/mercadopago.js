import { createPreference } from "./data.js";

async function createPreferenceId(order) {
    
    try {
        const preferenceId = await createPreference(order);

        if (preferenceId) {
            createMercadoPagoButton(preferenceId);
        } else {
            console.error('No preferenceId received from the server.');
        }
    } catch (error) {
        console.error('Error while getting preferenceId:', error);
    }

}

async function createMercadoPagoButton(preferenceId) {


    const mp = new MercadoPago('TEST-ea76c462-7363-4745-b32c-555a9663d47a');
    const bricksBuilder = mp.bricks();

    
    bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
    });

}

export { createPreferenceId };
