// LightBox Start
const lightboxCtn = document.querySelector('.lightbox');
lightboxCtn.style.display = 'none';

const lightboxPrevBtn = document.querySelector('.lightbox__prev');
const lightboxNextBtn = document.querySelector('.lightbox__next');

lightboxPrevBtn.addEventListener('click', () => {
  currentMediaIndex = (currentMediaIndex - 1 + media.length) % media.length;
  updateLightboxMedia(currentMediaIndex);
});

lightboxNextBtn.addEventListener('click', () => {
  currentMediaIndex = (currentMediaIndex + 1) % media.length;
  updateLightboxMedia(currentMediaIndex);
});

//  LightBox End

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
// Fonction pour afficher les médias du photographe
function displayMedia(photographer, media) {
  const mediaContainer = document.querySelector('#media_container');
  media.forEach((item) => {
    const firstName = photographer.name.split(' ')[0]; // Récupérer le prénom du photographe
    const newFirstName = firstName.replace('-', ' ');// Remplacer le tiret par un espace pour que le nom du fichier corresponde
    const mediaFolder = newFirstName; // Utiliser le prénom pour le nom du dossier

    if (item.image) {
      const imgPath = `assets/images/${mediaFolder}/${item.image}`;
      mediaContainer.innerHTML += `<article>
                                    <figure>
                                      <div class="media_item">
                                        <a href="">
                                        <img class="media_obj" src="${imgPath}" tabindex="0" alt="${item.title}">
                                        </a>
                                      </div>
                                      <figcaption>${item.title}</figcaption>
                                      <h3>${item.likes}</h3>
                                      <div><i class="fa-solid fa-heart"></div>
                                    </figure>
                                  </article>`;
    } else if (item.video) {
      const videoPath = `assets/images/${mediaFolder}/${item.video}`;
      mediaContainer.innerHTML += `<article>
                <figure>
                  <div class="media_item">
                    <a href="">
                    <video class="media_obj" src="${videoPath}" tabindex="0" controls></video>
                    </a>
                  </div>
                  <figcaption>${item.title}</figcaption>
                  <h3>${item.likes}</h3>
                  <div><i class="fa-solid fa-heart"></div>
                </figure>
              </article>`;
    }
  });
}

// Fonction pour vérifier si l'ID du photographe existe (met tous les photograpes dans un array et utilise some() pour tester s'il existe ou pas)
function checkPhotographerId(data, id) {
  const { photographers } = data;
  return photographers.some((photographer) => photographer.id === id);
}

// Fonction qui initialise les autres fonctions
async function init() {
  const photographerId = getPhotographerIdFromUrl();
  const data = await fetchData();

  if (checkPhotographerId(data, photographerId)) {
    const photographer = getPhotographerById(data, photographerId);
    const photographerMedia = getPhotographerMedia(data, photographerId);

    photographerMedia.forEach((photographer) => {
      console.log(photographer.likes);
    })
    displayPhotographerInfo(photographer);
    displayMedia(photographer, photographerMedia);
  } else {
    window.location.href = "index.html";
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