async function getProducts() {

    try {
      const response = await fetch('http://127.0.0.1:8000/products');
  
      const res = await response.json();
          
  
      const products = res.products;    
  
      return products; 
  
    } catch (error) {
      throw error; 
    }
  }
  
  async function saveOrder(order) {
  
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/save_order', {
          method: 'POST',
          body: JSON.stringify(order),
        });
  
        if (!response.ok) {
          throw new Error(`Error:  Status: ${response.status}`);
        }
        else {
          const parsedData = await response.json(); 
          resolve(parsedData); 
        }
        
      } catch (error) {
        reject(error);
      }
    });
  }
  
  async function createPreference(order) {
      try {
        const response = await fetch('http://127.0.0.1:8000/create_preference', {
          method: 'POST',
          body: JSON.stringify(order),
        });
  
        if (!response.ok) {
          throw new Error(`Error:  Status: ${response.status}`);
        }
  
        const parsedData = await response.json(); 
        const orderId = parsedData.order_id;
        const preferenceId = parsedData.preference_id;
  
        localStorage.clear();
        localStorage.setItem('orderId', orderId);
  
        return preferenceId
      } catch (error) {
        console.error('Error!!!!!!!!!!!');
      }
  }
  
  async function updateOrderStatus(orderId) {
  
    try {
      const response = await fetch('http://127.0.0.1:8000/update_order_status', {
        method: 'POST',
        body: JSON.stringify(orderId),
      });
  
      if (!response.ok) {
        throw new Error(`Error:  Status: ${response.status}`);
      } else {
        console.log(response);
      }
  
    } catch (error) {
      console.error(error);
    }
  
  }
    
  export { getProducts, createPreference, saveOrder, updateOrderStatus };