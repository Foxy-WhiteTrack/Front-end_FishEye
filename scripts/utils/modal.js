const modalbg = document.querySelector(".bground");
const closeBtn = document.querySelectorAll(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const content = document.querySelector(".content");

const closed = document.querySelector("#closed");
const confirmation = document.querySelector('.confirmation');
const validated = document.querySelector('#validated');

let formIsValidated = false;

// Variables éléments formulaire
const form = document.querySelector("#form");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthDate = document.querySelector("#birthdate");
const qtTournament = document.querySelector("#quantity");

// Variables locations formulaire
const locations = document.getElementsByName('location');
const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]');
const conditionsCheckbox = document.querySelector('#conditions');
const newsletterCheckbox = document.querySelector('#newsletter');

// Variables pour error
const errDivFirst = document.querySelector("#error-first");
const errDivLast = document.querySelector("#error-last");
const errDivEmail = document.querySelector("#error-email");
const errDivBirth = document.querySelector("#error-birth");
const errDivQuantity = document.querySelector("#error-quantity");
const errDivLocation = document.querySelector("#error-location");

const errDivConditions = document.querySelector("#error-conditions");

// les REGEX
const nbr = /^[0-9]+$/;
const namesForm = /^ ([a-zA-Z-ç-é-è-ê\s])+$ /;
const nbrForm = /^[0-9]+$/;

const emailForm = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Variables globales d'erreurs
let errorOnFirst;
let errorOnLast;
let errorOnEmail;

//tableau des erreurs dédiée
dataError = {
    empty: 'Merci de remplir ce champ',
    name: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom',
    last: 'Veuillez entrer 2 caractères ou plus pour le champ du nom',
    mail: 'le format d\'email n\'est pas valide',
    message: 'Merci  de taper un message'
}

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeForm));

closed.addEventListener("click", closeThx);

// fonction ouverture du formulaire
function launchModal() {
    reset();

    if (formIsValidated == false) {
        form.style.display = "block";
        modalbg.style.display = "block";
        validated.style.display = "none";
        content.style.display = "block";
    }
}

// fonction de fermeture du formulaire
function closeForm() {
    modalbg.style.display = "none";
}

// fonction pour fermeture panel remerciement
function closeThx() {
    validated.style.display = "none";
    content.style.display = "none";
    modalbg.style.display = "none";
    reset();
}

// fonction pour checker le prénom
function firstNameCheck() {
    const trimmedFirstName = firstName.value.trim();
    const errorKey = firstName.dataset.errorKey;

    if (trimmedFirstName === "") {
        errorOnFirst = true;
        errDivFirst.innerHTML = dataError.empty;
    } else if (trimmedFirstName.match(namesForm) && trimmedFirstName.length >= 2) {
        errorOnFirst = false;
        errDivFirst.style.display = 'none';
    } else {
        errorOnFirst = true;
        errDivFirst.innerHTML = dataError[errorKey];
    }
    errDivFirst.style.display = errorOnFirst ? 'block' : 'none';
}

// fonction pour checker le nom
function lastNameCheck() {
    const trimmedLastName = lastName.value.trim();

    if (trimmedLastName === "") {
        errorOnLast = true;
        errDivLast.innerHTML = dataError.empty;
    } else if (trimmedLastName.match(namesForm) && trimmedLastName.length >= 2) {
        errorOnLast = false;
        errDivLast.style.display = 'none';
    } else {
        errorOnLast = true;
        errDivLast.innerHTML = dataError.last;
    }
    errDivLast.style.display = errorOnLast ? 'block' : 'none';
}

// fonction pour checker l'email
function emailCheck() {
    const trimmedEmail = email.value.trim();

    if (trimmedEmail === "") {
        errorOnEmail = true;
        errDivEmail.innerHTML = dataError.empty;
    } else if (trimmedEmail.match(emailForm)) {
        errorOnEmail = false;
        errDivEmail.style.display = 'none';
    } else {
        errorOnEmail = true;
        errDivEmail.innerHTML = dataError.mail;
    }
    errDivEmail.style.display = errorOnEmail ? 'block' : 'none';
}


function messageCheck() {
    if (conditionsCheckbox.checked) {
        errorOnCondition = false;
        errDivConditions.style.display = 'none';
    } else {
        errorOnCondition = true;
        errDivConditions.innerHTML = dataError.condition;
        errDivConditions.style.display = 'block';
    }
}

// Fonction pour valider les entrées
function validation() {
    if (errorOnFirst == false && errorOnLast == false && errorOnEmail == false) {
        form.style.display = "none";
        confirmation.style.display = "block";
        validated.style.display = "flex";
    }
}

// reset le formulaire
function reset() {
    document.querySelector("#form").reset();
    errorOnFirst = true;
    errorOnLast = true;
    errorOnEmail = true;
    errorOnMessage = true;
}

// Fonction pour lancer les fonction qui vont checker toutes les entrées
function check() {
    firstNameCheck();
    lastNameCheck();
    emailCheck();
    messageCheck();
    validation();
}

// écouter le bouton submit et lancer la fonction check au clic
form.addEventListener('submit', function (event) {
    event.preventDefault();
    check();
});