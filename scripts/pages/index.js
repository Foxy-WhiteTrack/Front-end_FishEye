async function getPhotographers() {
  try {
    const response = await fetch('./data/photographers.json');
    console.log('alert hzieqsfsd zefergsdf zefzef');
    if (!response.ok) {
      throw new Error('Error lors du chargement');
    }

    const photographers = await response.json();

    return photographers;
  } catch (error) {
    // retourne le tableau vide pour permettre au script de fonctionner quand même en cas d'erreur
    console.log("erreur retournée");
  }
}

async function displayError() {

}

function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  console.log(photographers);
  displayData(photographers.photographers);

}

init();
