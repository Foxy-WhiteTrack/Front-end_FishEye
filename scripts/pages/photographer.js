import { mediaFactory } from '../factories/media-factory.js';

const namePhographe = document.querySelector("#namePhotograph");

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

  const mediaContainer = document.querySelector('#media_container');
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

// Fonction qui initialise les autres fonctions
async function init() {
  const photographerId = getPhotographerIdFromUrl();
  const data = await fetchData();

  if (checkPhotographerId(data, photographerId)) {
    const photographer = getPhotographerById(data, photographerId);
    const photographerMedia = getPhotographerMedia(data, photographerId);

    displayPhotographerInfo(photographer);
    displayMedia(photographer, photographerMedia);
    displayTotalLikes(photographerMedia, photographer);
  } else {
    window.location.href = "index.html";
  }
}

init();