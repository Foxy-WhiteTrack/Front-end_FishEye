import { mediaFactory } from '../factories/media-factory.js';

const namePhographe = document.querySelector("#namePhotograph");

const lightbox = document.getElementById('lightbox');
const lightboxContainer = document.getElementById('lightbox_container');
const lightboxCloseBtn = document.getElementById('lightbox_close');
const lightboxNextBtn = document.getElementById('lightbox_next');
const lightboxPrevBtn = document.getElementById('lightbox_prev');
const mediaContainer = document.querySelector('#media_container');

lightbox.style.display = 'none';


// Fonction pour récupérer le photographer selon l'url et son id qui est dedans
function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'), 10);
}

// Fonction pour récupérer les données
async function fetchData() {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    return data;
}

// fonction pour récupérer le photographer selon son id (l'id doit être le même que l'id sur l'url)
function getPhotographerById(data, id) {
    const { photographers } = data;
    return photographers.find((photographer) => photographer.id === id);
}

// fonction pour récupérer les medias du photographer 
function getPhotographerMedia(data, photographerId) {
    const { media } = data;
    return media.filter((item) => item.photographerId === photographerId);
}

// Fonction pour afficher les informations du photographe
function displayPhotographerInfo(photographer) {
    const photo = photographer.portrait;
    const { name } = photographer;
    document.querySelector('#photograph_infos > h1').innerHTML = photographer.name;
    namePhographe.innerHTML = photographer.name;
    document.querySelector('#photograph_infos > h2:nth-child(2)').innerHTML = `${photographer.city}, ${photographer.country}`;
    document.querySelector('#photograph_infos > p:nth-child(3)').innerHTML = photographer.tagline;
    document.querySelector('#img_photograph').innerHTML = `<img src="assets/images/Photographers ID Photos/${photo}" alt="Photo du profil de ${name}">`;
}

// Fonction pour vérifier si l'ID du photographe existe (met tous les photograpes dans un array et utilise some() pour tester s'il existe ou pas)
function checkPhotographerId(data, id) {
    const { photographers } = data;
    // vérifie si au moins un des tableau passe le test
    return photographers.some((photographer) => photographer.id === id);
}

// Fonction pour afficher les likes 
function displayTotalLikes(media, photographer) {
    // reduce => fonction qui permet l'accumulation d'un nombre
    const totalLikes = media.reduce((acc, item) => acc + item.likes, 0);
    document.querySelector('#total_likes').textContent = `${totalLikes}`;
    const price = photographer.price;
    document.querySelector('#price').textContent = `${price} € / jour`;
}

function sortMedia(media) {

    // récupérer la valeur du select
    const sortSelect = document.getElementById('sort-select');
    const sortBy = parseInt(sortSelect.value, 10);
    // switch selon la selection
    switch (sortBy) {
        // case popularité => 
        // media.sort() qui permet de trier par pop
        case 0: // Trier par popularité
            media.sort((a, b) => b.likes - a.likes);
            break;
        //case date =>
        // media.sort() qui permet de trier par date
        case 1: // Trier par date
            media.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        // case titre =>
        // media.sort() qui permet de trier par titre
        case 2: // Trier par titre
            media.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            break;
    }
    return media;
}

// Fonction pour afficher les médias du photographe (mettre le tri d'entrée)
function displayMedia(photographer, media) {
    const mediaSort = sortMedia(media);

    let mediaHtml = '';

    mediaSort.forEach((item) => {
        const firstName = photographer.name.split(' ')[0];
        const newFirstName = firstName.replace('-', ' ');
        const mediaFolder = newFirstName;

        const mediaElement = mediaFactory(item, mediaFolder);
        mediaHtml += `<div id="media_${item.id}" class="">${mediaElement}</div>`;
    });

    mediaContainer.innerHTML = mediaHtml;

    // gestionnaire d'événement à chaque cœur
    media.forEach((item) => {
        const likeIcon = document.getElementById(`like_${item.id}`);
        let isClicked = false;

        // gérer le clic sur le coeur
        const handleLikeClick = () => {
            if (!isClicked) {
                item.likes++;
                isClicked = true;
                const likesElement = document.querySelector(`#media_${item.id} .likes h3`);
                likesElement.textContent = item.likes;
                const totalLikesElement = document.querySelector('#total_likes');
                const totalLikes = media.reduce((acc, item) => acc + item.likes, 0);
                totalLikesElement.textContent = totalLikes;
                likeIcon.classList.remove("fa-regular");
                likeIcon.classList.add("fa-solid");
            } else {
                item.likes--;
                isClicked = false;
                const likesElement = document.querySelector(`#media_${item.id} .likes h3`);
                likesElement.textContent = item.likes;
                const totalLikesElement = document.querySelector('#total_likes');
                const totalLikes = media.reduce((acc, item) => acc + item.likes, 0);
                totalLikesElement.textContent = totalLikes;
                likeIcon.classList.remove("fa-solid");
                likeIcon.classList.add("fa-regular");
            }
        };

        // gestionnaires d'événements pour le clavier 
        likeIcon.addEventListener('keydown', (event) => {
            if (event.code === "Enter") {
                handleLikeClick();
            }
        });

        // rôle et attribut tabindex pour permettre le focus avec la touche Tab
        likeIcon.setAttribute("role", "button");
        likeIcon.setAttribute("tabindex", "0");

        // Ajoute le gestionnaire de clic pour les interactions souris
        likeIcon.addEventListener('click', handleLikeClick);
    });
}


export function displayName() {
    document.querySelector('#name-photographe').innerHTML = photographer.name;
}

function openLightbox(mediaId) {
    // Récupère les informations sur le média à partir de son ID
    const selectedMedia = photographerMedia.find((media) => media.id === mediaId);

    // Crée le contenu de la lightbox avec la photo sélectionnée
    const lightboxContent = `
    <img src="${selectedMedia.image}" alt="${selectedMedia.title}" class="lightbox-image">
    <figcaption>${selectedMedia.title}</figcaption>
  `;

    // Afficher le contenu dans la lightbox
    lightboxContainer.innerHTML = lightboxContent;

    // Afficher la lightbox
    lightbox.style.display = 'block';

    // Définir le focus sur la lightbox pour une meilleure accessibilité
    lightbox.focus();
}


mediaContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('media_obj')) {
        const mediaId = event.target.dataset.mediaId;
        openLightbox(mediaId);
    }
});

function closeLightbox() {
    // Masque la lightbox
    lightbox.style.display = 'none';
}


lightboxCloseBtn.addEventListener('click', closeLightbox);

let currentMediaIndex = 0; // Index du média actuellement affiché dans la lightbox

function showNextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % photographerMedia.length; // Incrémente l'index du média
    displayMediaInLightbox(currentMediaIndex);
}

function showPrevMedia() {
    currentMediaIndex = (currentMediaIndex - 1 + photographerMedia.length) % photographerMedia.length; // Décrémente l'index du média
    displayMediaInLightbox(currentMediaIndex);
}

function displayMediaInLightbox(index) {
    const selectedMedia = photographerMedia[index];
    const lightboxImage = lightboxContainer.querySelector('.lightbox-image');
    const lightboxCaption = lightboxContainer.querySelector('figcaption');

    lightboxImage.src = selectedMedia.image;
    lightboxImage.alt = selectedMedia.title;
    lightboxCaption.textContent = selectedMedia.title;
}

lightboxNextBtn.addEventListener('click', showNextMedia);
lightboxPrevBtn.addEventListener('click', showPrevMedia);



// Fonction qui initialise les autres fonctions
async function init() {
    const photographerId = getPhotographerIdFromUrl();
    const data = await fetchData();

    if (checkPhotographerId(data, photographerId)) {
        const photographer = getPhotographerById(data, photographerId);
        const photographerMediaData = getPhotographerMedia(data, photographerId); // Renomme la variable ici

        displayPhotographerInfo(photographer);
        displayMedia(photographer, photographerMediaData); // Utilise la nouvelle variable renommée ici
        displayTotalLikes(photographerMediaData, photographer); // Utilise la nouvelle variable renommée ici

        const sortSelect = document.getElementById('sort-select');

        // Ajouter l'attribut aria-selected selon l'option sélectionnée
        const updateAriaSelected = () => {
            const selectedOption = sortSelect.querySelector('option[selected]');
            if (selectedOption) {
                selectedOption.setAttribute('aria-selected', 'true');
            }
        };

        // mettre un écouteur d'event sur le select et mettre à jour le tri
        sortSelect.addEventListener('change', () => {
            const sortedMedia = sortMedia(photographerMedia);
            displayMedia(photographer, sortedMedia);
        });

        // Selon si la flèche haut ou bas est appuyé changer de select
        sortSelect.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
                const selectedIndex = sortSelect.selectedIndex;
                const lastIndex = sortSelect.options.length - 1;

                // Gèrer le déplacement de la sélection vers le haut et le bas avec les flèches haut/bas
                if (event.code === 'ArrowUp' && selectedIndex > 0) {
                    sortSelect.selectedIndex = selectedIndex - 1;
                } else if (event.code === 'ArrowDown' && selectedIndex < lastIndex) {
                    sortSelect.selectedIndex = selectedIndex + 1;
                }

                // Mettre à jour l'attribut aria-selected après le déplacement de la sélection
                updateAriaSelected();
            } else if (event.code === 'Enter') {
                const sortedMedia = sortMedia(photographerMedia);
                displayMedia(photographer, sortedMedia);
            }
        });

        // Mettre à jour l'attribut aria-selected au chargement de la page
        updateAriaSelected();
    } else {
        window.location.href = "index.html";
    }
}



init();