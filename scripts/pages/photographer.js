import { mediaFactory } from '../factories/media-factory.js';

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
  document.querySelector('#photograph_infos > p:nth-child(2)').innerHTML = `${photographer.city}, ${photographer.country}`;
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
  console.log(price);
  document.querySelector('#price').textContent = `${price} € / jour`;
}

// Fonction pour afficher les médias du photographe
function displayMedia(photographer, media) {
  const mediaContainer = document.querySelector('#media_container');
  let mediaHtml = '';
  console.log(media);

  media.forEach((item) => {
    const firstName = photographer.name.split(' ')[0];
    const newFirstName = firstName.replace('-', ' ');
    const mediaFolder = newFirstName;

    mediaHtml += mediaFactory(item, mediaFolder);
  });

  mediaContainer.innerHTML = mediaHtml;
}

// Fonction qui initialise les autres fonctions
async function init() {
  const photographerId = getPhotographerIdFromUrl();
  const data = await fetchData();

  console.log(checkPhotographerId(data, photographerId));
  if (checkPhotographerId(data, photographerId)) {
    const photographer = getPhotographerById(data, photographerId);
    const photographerMedia = getPhotographerMedia(data, photographerId);

    console.log(photographer);

    // photographerMedia.forEach((photographer) => {
    //   console.log(photographer.likes);
    // })

    displayPhotographerInfo(photographer);
    displayMedia(photographer, photographerMedia);
    displayTotalLikes(photographerMedia, photographer);
  } else {
    // window.location.href = "index.html";
  }
}

init();

// fonction pour trier les éléments
function tri() {
  const elt = document.getElementById('filter');
  elt.innerHTML = `<p>Trier par</p>
        <div class="custom-select" style="width:200px;">
          <select>
            <option value="0" tabindex="0">Popularité</option>
            <option value="1" tabindex="0">Date</option>
            <option value="2" tabindex="0">Titre</option>
          </select>
        </div>`;
  return elt;
}
tri();