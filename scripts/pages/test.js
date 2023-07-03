import { mediaFactory } from '../factories/media-factory.js';

const namePhographe = document.querySelector('#namePhotograph');

const lightbox = document.getElementById('lightbox');
const lightboxContainer = document.getElementById('lightbox_container');
const mediaContainer = document.querySelector('#media_container');
const mediaImage = document.querySelector('#lightbox_image');
const mediaVideo = document.querySelector('#lightbox_video');

const emClose = document.querySelector('#emClose');
const emPrev = document.querySelector('#emPrev');
const emNext = document.querySelector('#emNext');

let mediaTitle = document.querySelector('#lightbox_media_title');

let lightboxIsOpen = false;

function checkLighboxIsOpen() {
  if (lightboxIsOpen) {
    lightbox.style.display = 'block';
  } else {
    lightbox.style.display = 'none';
  }
}

checkLighboxIsOpen();

let photographerMedia = [];

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
  const { price } = photographer;
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
    // case date =>
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
  // console.log("mediaSort =");
  // console.log(mediaSort[3]);

  let mediaHtml = '';

  // item est l'élément et index l'index dans le tableau qui permettra ensuite de pécho l'index et de le mettre dans data-id
  mediaSort.forEach((item, index) => {
    const firstName = photographer.name.split(' ')[0];
    const newFirstName = firstName.replace('-', ' ');
    const mediaFolder = newFirstName;

    const mediaElement = mediaFactory(item, mediaFolder, index);
    // l'index est récupéré et fouttu dans le data-id pour savoir sur quel élément on est
    mediaHtml += `<div id="media_${item.id}" data-id="${index}">
    ${mediaElement}
    </div>`;
  });

  mediaContainer.innerHTML = mediaHtml;

  // gestionnaire d'événement à chaque cœur
  media.forEach((item) => {
    const indexElement = item;
    // console.log(indexElement);

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
        likeIcon.classList.remove('fa-regular');
        likeIcon.classList.add('fa-solid');
      } else {
        item.likes--;
        isClicked = false;
        const likesElement = document.querySelector(`#media_${item.id} .likes h3`);
        likesElement.textContent = item.likes;
        const totalLikesElement = document.querySelector('#total_likes');
        const totalLikes = media.reduce((acc, item) => acc + item.likes, 0);
        totalLikesElement.textContent = totalLikes;
        likeIcon.classList.remove('fa-solid');
        likeIcon.classList.add('fa-regular');
      }
    };

    // gestionnaires d'événements pour le clavier
    likeIcon.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        handleLikeClick();
      }
    });

    // rôle et attribut tabindex pour permettre le focus avec la touche Tab
    likeIcon.setAttribute('role', 'button');
    likeIcon.setAttribute('tabindex', '0');

    // Ajoute le gestionnaire de clic pour les interactions souris
    likeIcon.addEventListener('click', handleLikeClick);
  });
}

async function openLightbox(mediaDataId, mediaSrc) {
  lightboxIsOpen = true;
  checkLighboxIsOpen();

  const currentDataId = mediaDataId;
  mediaImage.src = mediaSrc;

  const photographerId = getPhotographerIdFromUrl();
  const data = await fetchData();
  const photographer = getPhotographerById(data, photographerId);
  const mediaFolder = getPhotographerFolderPath(photographer.name);

  displayMediaInLightbox(currentDataId, mediaFolder);

  lightbox.setAttribute('aria-hidden', 'false');


  emClose.setAttribute('aria-label', 'Fermer');
  emPrev.setAttribute('aria-label', 'Image précédente');
  emNext.setAttribute('aria-label', 'Image suivante');
  emClose.setAttribute('tabindex', '1');
  emPrev.setAttribute('tabindex', '1');
  emNext.setAttribute('tabindex', '1');
  emPrev.focus();

}

function closeLightbox() {

  console.log("close!");
  // Masque la lightbox
  lightboxIsOpen = false;
  checkLighboxIsOpen();

  emClose.setAttribute('aria-label', 'Fermeture du formulaire de contact');
  emPrev.setAttribute('aria-label', 'Précédent');
  emNext.setAttribute('aria-label', 'Suivant');
  emClose.setAttribute('tabindex', '-1');
  emPrev.setAttribute('tabindex', '-1');
  emNext.setAttribute('tabindex', '-1');

  document.getElementById('contact_button').focus();

  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('tabindex', '-1');
}

mediaContainer.addEventListener('keydown', (event) => {
  if (event.code === 'Enter' && event.target.classList.contains('media_obj')) {
    // transférer la data-id à la lightbox
    const mediaClicked = event.target;
    const mediaDataId = mediaClicked.getAttribute('data-id');
    mediaImage.setAttribute('data-id', mediaDataId);

    const mediaPath = event.target.src;
    console.log(mediaDataId);
    openLightbox(mediaDataId, mediaPath, mediaPath);

    mediaImage.src = mediaPath;
  }
});

mediaContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('media_obj')) {
    // transferrer la data-id à la lightbox
    const mediaClicked = event.target;
    const mediaDataId = mediaClicked.getAttribute('data-id');
    mediaImage.setAttribute('data-id', mediaDataId);

    const mediaPath = event.target.src;
    console.log(mediaDataId);
    openLightbox(mediaDataId, mediaPath, mediaPath);

    mediaImage.src = mediaPath;
  }
});

export function displayName() {
  document.querySelector('#name-photographe').innerHTML = photographer.name;
}

function getPhotographerFolderPath(photographerName) {
  const basePath = 'assets/images/';
  const sanitizedFolderName = photographerName.split(' ')[0];
  const newFoldername = sanitizedFolderName.replace('-', ' ');
  const pathPhotographer = `${basePath}${newFoldername}/`;
  return pathPhotographer;
}

emClose.addEventListener('click', closeLightbox);

const currentMediaIndex = 0; // Index du média actuellement affiché dans la lightbox

// bloquer à la dernière image et ne pas revenir en arrière au premier élémment si je clique sur next au dernier éléméent
async function showNextMedia(nextIndex, nextIndex, mediaFolder) {
  const currentDataId = parseInt(mediaImage.getAttribute('data-id'), 10);
  nextIndex = currentDataId + 1;

  // Vérifie si l'index suivant dépasse la limite supérieure du tableau
  // si on tente d'aller après le tableau
  if (nextIndex >= photographerMedia.length) {
    emNext.style.color = "#901c1c48";
    return;
    // si on tente d'aller avant le tableau 
  } else if (nextIndex < photographerMedia.length) {
    console.log(nextIndex);
    emNext.style.color = "#901C1C";
    // si on est à la fois avant la fin du tableau et après le début du tableau
  } else if (nextIndex < photographerMedia.length && nextIndex >= 0) {
    emNext.style.color = "#901C1C";
  }



  const nextMedia = photographerMedia[nextIndex];
  const data = await fetchData();
  const photographerId = getPhotographerIdFromUrl();
  const photographer = getPhotographerById(data, photographerId);

  mediaFolder = getPhotographerFolderPath(photographer.name);
  let mediaSrc = '';
  mediaTitle = nextMedia.title;

  if (nextMedia.image) {
    mediaVideo.style.display = 'none';
    mediaImage.style.display = 'block';
    mediaSrc = mediaFolder + nextMedia.image;
    console.log('imageShowNext');
    mediaImage.src = mediaSrc;
    mediaImage.setAttribute('data-id', nextIndex);
  } else {
    mediaImage.style.display = 'none';
    mediaVideo.style.display = 'block';
    mediaSrc = mediaFolder + nextMedia.video;
    mediaVideo.src = mediaSrc;
    mediaVideo.setAttribute('data-id', nextIndex);
    console.log('videoShowNext');
  }

  console.log(mediaSrc);
}

async function showPrevMedia(prevIndex, nextIndex, mediaFolder) {
  const currentDataId = parseInt(mediaImage.getAttribute('data-id'), 10);
  prevIndex = currentDataId - 1;

  // Vérifie si l'index précédent est inférieur à 0
  if (prevIndex <= 0) {
    emPrev.style.color = "#901c1c48";
    return;
  } else if (nextIndex < photographerMedia.length) {
    console.log(nextIndex);
    emPrev.style.color = "#901C1C";
    // si on est à la fois avant la fin du tableau et après le début du tableau
  } else if (nextIndex < photographerMedia.length && nextIndex >= 0) {
    emPrev.style.color = "#901C1C";
  }

  const prevMedia = photographerMedia[prevIndex];
  const data = await fetchData();
  const photographerId = getPhotographerIdFromUrl();
  const photographer = getPhotographerById(data, photographerId);
  mediaFolder = getPhotographerFolderPath(photographer.name);
  let mediaSrc = '';
  let videoSrc = '';

  mediaTitle = prevMedia.title;
  if (prevMedia.image) {
    mediaSrc = mediaFolder + prevMedia.image;
    mediaImage.src = mediaSrc;
    mediaImage.setAttribute('data-id', prevIndex);
    console.log(mediaSrc);
    mediaVideo.style.display = 'none';
    mediaImage.style.display = 'block';
  } else {
    mediaVideo.style.display = 'block';
    videoSrc = mediaFolder + prevMedia.video;
    mediaVideo.src = videoSrc;
    mediaVideo.setAttribute('data-id', prevIndex);
    console.log(videoSrc);
    mediaImage.style.display = 'none';
  }
}

function displayMediaInLightbox(lightboxIndex, mediaFolder) {
  // lister les media dans un tableau

  const nextIndex = lightboxIndex++;
  const prevIndex = lightboxIndex--;

  const prevMedia = photographerMedia[prevIndex];
  if (prevMedia.image) {
    mediaImage.style.display = 'block';
    mediaVideo.style.display = 'none';
    const prevMediaSrc = mediaFolder + prevMedia.image;
  } else {
    mediaImage.style.display = 'none';
    mediaVideo.style.display = 'block';
    const prevMediaSrc = mediaFolder + prevMedia.video;
  }

  const nextMedia = photographerMedia[nextIndex];
  if (nextMedia.image) {
    mediaImage.style.display = 'block';
    mediaVideo.style.display = 'none';
    const nextMediaSrc = mediaFolder + nextMedia.image;
  } else {
    mediaImage.style.display = 'none';
    mediaVideo.style.display = 'block';
    const nextMediaSrc = mediaFolder + nextMedia.video;
  }

}

emClose.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    closeLightbox();
  }
});

emPrev.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    showPrevMedia();
  }
});

emNext.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    showNextMedia();
  }
});

// quand on appuie sur next ou prev lancer showNext ou showPrev
emNext.addEventListener('click', showNextMedia);
emPrev.addEventListener('click', showPrevMedia);

// Fonction qui initialise les autres fonctions
async function init() {
  const photographerId = getPhotographerIdFromUrl();
  const data = await fetchData();

  if (checkPhotographerId(data, photographerId)) {
    const photographer = getPhotographerById(data, photographerId);
    photographerMedia = getPhotographerMedia(data, photographerId);

    displayPhotographerInfo(photographer);
    getPhotographerFolderPath(photographer.name);
    displayMedia(photographer, photographerMedia);
    displayTotalLikes(photographerMedia, photographer);

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
        const { selectedIndex } = sortSelect;
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
    window.location.href = 'index.html';
  }
}

init();
