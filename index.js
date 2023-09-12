const axios = require('axios');
const publicKey = 'f44b09b706be0a497d39ead99f1e0566';
const privateKey = '9665a23701170728f09ec5521ec3f39c0fa1c324';

// Calcula un timestamp y un hash para autenticación
const ts = new Date().getTime();
const hash = require('crypto').createHash('md5').update(ts + privateKey + publicKey).digest('hex');

// ID del superhéroe de Marvel que deseas obtener (puedes cambiarlo)
const superheroId = 1009610; // Ejemplo: Spider-Man

// URL de la API de Marvel para obtener información del superhéroe por ID
const apiUrl = `https://gateway.marvel.com/v1/public/characters/${superheroId}`;

// Parámetros de la solicitud
const params = {
  ts: ts,
  apikey: publicKey,
  hash: hash
};

// Obtener una referencia a los elementos del DOM
const superheroNameElement = document.getElementById('superhero-name');
const superheroImageElement = document.getElementById('superhero-image');

// Realiza una solicitud GET a la API de Marvel
axios.get(apiUrl, { params })
  .then(response => {
    // Procesa los datos de respuesta
    const data = response.data;
    const character = data.data.results[0]; // Obtiene el primer personaje (puede haber varios resultados)

    // Muestra el nombre del superhéroe en el DOM
    superheroNameElement.textContent = character.name;

    // Construye la URL de la imagen del superhéroe y muestra la imagen en el DOM
    const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    superheroImageElement.src = imageUrl;
    superheroImageElement.alt = `Imagen de ${character.name}`;
  })
  .catch(error => {
    // Maneja errores
    console.error(error);
  });