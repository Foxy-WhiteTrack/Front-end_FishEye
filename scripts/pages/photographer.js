//Mettre le code JavaScript lié à la page photographer.html

// Fonction pour récupérer l'ID du photographe à partir de l'URL
function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("id"));
}

// Fonction pour récupérer le photographe correspondant à l'ID
async function fetchData() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data;
}

function getPhotographerById(data, id) {
    const photographers = data.photographers;
    return photographers.find(photographer => photographer.id === id);
}

function getPhotographerMedia(data, photographerId) {
    const media = data.media;
    return media.filter(item => item.photographerId === photographerId);
}

// Fonction pour afficher les informations du photographe
function displayPhotographerInfo(photographer) {
    console.log(photographer);
    let photo = photographer.portrait;
    let name = photographer.name;
    // const elfotografo = document.getElementById('photograph_infos').innerHTML = photographer.name;
    document.querySelector('#photograph_infos > h1').innerHTML = photographer.name;
    document.querySelector('#photograph_infos > p:nth-child(2)').innerHTML = photographer.city + ', ' + photographer.country;
    document.querySelector('#photograph_infos > p:nth-child(3)').innerHTML = photographer.tagline;
    document.querySelector('#img_photograph').innerHTML = `<img src="assets/images/Photographers ID Photos/${photo}" alt="Photo du profil de ${name}">`;
}
// Fonction pour afficher les médias du photographe
function displayMedia(photographer, media) {
    const mediaContainer = document.querySelector("#media_container");
    media.forEach(item => {
        const firstName = photographer.name.split(' ')[0]; // Récupérer le prénom du photographe
        const mediaFolder = firstName; // Utiliser le prénom pour le nom du dossier

        if (item.image) {
            const imgPath = `assets/images/${mediaFolder}/${item.image}`;
            mediaContainer.innerHTML += `
                <div class="media_item">
                    <img class="media_obj" src="${imgPath}" alt="${item.title}">
                </div>
            `;
        } else if (item.video) {
            const videoPath = `assets/images/${mediaFolder}/${item.video}`;
            mediaContainer.innerHTML += `
                <div class="media_item">
                    <video class="media_obj" src="${videoPath}" controls></video>
                </div>
            `;
        }
    });
}



// Fonction principale pour récupérer et afficher les informations du photographe
async function init() {
    const photographerId = getPhotographerIdFromUrl();
    const data = await fetchData();
    const photographer = getPhotographerById(data, photographerId);
    const photographerMedia = getPhotographerMedia(data, photographerId);

    displayPhotographerInfo(photographer);
    displayMedia(photographer, photographerMedia);
}

init();