async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

    try {
        const response = await fetch("./data/photographers.json");

        if (!response.ok) {
            throw new Error("Error lors du chargement")
        }

        const photographers = await response.json();

        return photographers

    } catch (error) {
        console.error("Error lors de la récup JSON : ", error);
        // retourne le tableau vide pour permettre au script de fonctionner quand même en cas d'erreur
        return { photographers: [] };
    }

}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

