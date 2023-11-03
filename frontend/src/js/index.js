fetch('/frontend/src/header.html')
    .then(response => response.text()) // Convierte la respuesta a texto
    .then(data => {
        // Inserta el contenido en el elemento con id 'header'
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });