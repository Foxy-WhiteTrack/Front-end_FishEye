//Mettre le code JavaScript lié à la page photographer.html

// Fonction pour récupérer l'ID du photographe à partir de l'URL
function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id"));
}

// Fonction pour récupérer le photographe correspondant à l'ID
async function getPhotographerById(id) {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers;
    return photographers.find(photographer => photographer.id === id);
}

// Fonction pour afficher les informations du photographe
function displayPhotographerInfo(photographer) {
    console.log(photographer);
    // const elfotografo = document.getElementById('photograph_infos').innerHTML = photographer.name;
    document.querySelector('#photograph_infos > h1').innerHTML = photographer.name;
    document.querySelector('#photograph_infos > p:nth-child(2)').innerHTML = photographer.city + ', ' + photographer.country;
    document.querySelector('#photograph_infos > p:nth-child(3)').innerHTML = photographer.tagline;

}

// Fonction principale pour récupérer et afficher les informations du photographe
async function init() {
    const photographerId = getPhotographerIdFromUrl();
    const photographer = await getPhotographerById(photographerId);
    displayPhotographerInfo(photographer);
}

init();
