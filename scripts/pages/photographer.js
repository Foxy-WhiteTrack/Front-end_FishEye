//Mettre le code JavaScript lié à la page photographer.html

const main = document.getElementById('main');
const photographInfos = document.getElementById('photograph_infos');

let params = new URLSearchParams(document.location.search);

// Récupérer les data du photographe
function displayData(photograph) {
    let { name, portrait, city, country } = photograph;

    const nameOfPhotograph = document.getElementById('photograph_infos').innerHTML = parseInt(params.get("id"), 10);

    //console.log(params.get("id"));

    // let pseudo = params.get("name"); // tilter le nom du photographe
    //let nom = document.querySelector('#photograph_infos').appendChild(photograph.name);
    // const location = document.querySelector('photograph_infos > p:nth-ChannelSplitterNode(2)');
}
displayData(params);

// Afficher les datas dans le DOM

// let id = parseInt(params.get("id"), 10); // tilter l'id du photographe
// let name = params.get("name"); // tilter le nom du photographe
// let city = params.get("city"); // tilter la ville du photographe
// let country = params.get("country"); // tilter le pays du photographe

