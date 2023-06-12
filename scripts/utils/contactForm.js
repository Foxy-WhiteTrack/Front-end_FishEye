let formCtn = document.getElementById('form-ctn');
let panel = document.getElementById('contact_modal');
let background = document.getElementById('bg-panel');

let close = document.querySelector('.close');

// Variables éléments formulaire
const form = document.querySelector("#form");

const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const closeImg = document.querySelector("#closeImg");

// Variables globales d'erreurs
let errorOnFirst;
let errorOnLast;
let errorOnEmail;
let errorOnMess;

const modalElements = document.querySelectorAll('.form-item');

const namesForm = /^[a-zA-Z\u00C0-\u017F\- ]+$/;

/*

^ : Indique le début de la chaîne de caractères.

[a-zA-Z\u00C0-\u017F\- ] : C'est une classe de caractères qui correspond à une lettre de l'alphabet en minuscule (a-z), en majuscule (A-Z), aux caractères accentués entre \u00C0 et \u017F (qui couvrent une large gamme de caractères accentués couramment utilisés) et au tiret (\-). L'espace ( ) est également inclus dans la classe de caractères.

+ : Indique que la classe de caractères précédente peut apparaître une ou plusieurs fois, ce qui signifie que plusieurs lettres ou caractères de la classe peuvent être présents dans le prénom.

$ : Indique la fin de la chaîne de caractères.

*/



const emailForm = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//tableau des erreurs dédiée
dataError = {
  empty: 'Merci de remplir ce champ',
  name: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom',
  last: 'Veuillez entrer 2 caractères ou plus pour le champ du nom',
  mail: 'le format d\'email n\'est pas valide',
  message: 'Veuillez entrer un message',
  fname: 'le format du prénom n\'est pas valide',
  lname: 'le format du nom n\'est pas valide',
}


// Fonction pour activer l'ordre de tabulation personnalisé de la modal
function enableModalTabOrder() {
  const modalElements = document.querySelectorAll('.form-item');
  console.log(modalElements);
  modalElements.forEach((element) => {
    element.setAttribute('tabindex', '3');
  });
}

// Fonction pour rétablir l'ordre de tabulation normal
function restoreDefaultTabOrder() {
  const modalElements = document.querySelectorAll('.form-item');
  console.log(modalElements);
  modalElements.forEach((element) => {
    element.setAttribute('tabindex', '0');
  });
}


function createThanks() {
  const formPanel = document.getElementById('form-panel');
  formPanel.style.display = "block";
}

function deleteForm() {
  document.body.classList.remove('modal-open');

  background.style.display = 'none';
  formCtn.style.display = "none";

  restoreDefaultTabOrder();
  reset();
}

function createForm() {
  reset();
  form.style.display = "block";
  background.style.display = 'block';
  const tabIndexed = document.querySelectorAll('.access');
  tabIndexed.forEach((tabIndex) => {
    tabIndex.setAttribute('tabindex', '-1')
  });
  document.body.classList.add('modal-open');
  formCtn.style.display = "block";

  enableModalTabOrder();
  closeImg.focus();
}

function handleKeyDown(event) {
  if (event.key === "Escape") {
    deleteForm();
  }
}
window.addEventListener('keydown', handleKeyDown);

closeImg.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    deleteForm();
  }
});


function createErrorMessage(field, message) {
  const error = document.createElement('div');
  field.classList.add('error');
  error.classList.add('error-message');
  error.innerHTML = message;
}

// Variables pour error
const errDivFirst = document.querySelector("#error-first");
const errDivLast = document.querySelector("#error-last");
const errDivEmail = document.querySelector("#error-email");
const errDivMess = document.querySelector("#error-message");

// fonction pour checker le prénom
function firstNameCheck() {
  const trimmedFirstName = firstName.value.trim();

  errorOnFirst = false;
  //console.log("1", trimmedFirstName, errorOnFirst, trimmedFirstName.match(namesForm), namesForm.test(trimmedFirstName));
  if (trimmedFirstName === "" || trimmedFirstName.length < 2) {
    console.log("prénom pas OP, vide");
    errorOnFirst = true;
    errDivFirst.innerHTML = dataError.empty;
  } else if (!trimmedFirstName.match(namesForm)) {
    console.log("prénom non OP, ne match pas");
    errorOnFirst = true;
    errDivFirst.innerHTML = dataError.fname;
  }
  errDivFirst.style.display = errorOnFirst ? 'block' : 'none';
  //console.log("2", trimmedFirstName, errorOnFirst);
}

// fonction pour checker le nom
function lastNameCheck() {
  const trimmedLastName = lastName.value.trim();

  errorOnLast = false;

  if (trimmedLastName === "" || trimmedLastName.length < 2) {
    console.log("nom pas OP, vide");
    errorOnLast = true;
    errDivLast.innerHTML = dataError.empty;
  } else if (!trimmedLastName.match(namesForm)) {
    console.log("nom OP");
    errorOnLast = true;
    errDivFirst.innerHTML = dataError.lname;
  }
  errDivLast.style.display = errorOnLast ? 'block' : 'none';
}

// fonction pour checker l'email
function emailCheck() {
  const trimmedEmail = email.value.trim();

  if (trimmedEmail === "") {
    console.log("mail pas OP, vide");
    errorOnEmail = true;
    errDivEmail.innerHTML = dataError.empty;
  } else if (trimmedEmail.match(emailForm)) {
    console.log("mail OP");
    errorOnEmail = false;
    errDivEmail.style.display = 'none';
  } else {
    console.log("mail pas OP");
    errorOnEmail = true;
    errDivEmail.innerHTML = dataError.mail;
  }
  errDivEmail.style.display = errorOnEmail ? 'block' : 'none';
}

// fonction pour checker le nom
function messCheck() {

  errorOnMess = false;

  if (message.value === "" || message.value.length < 3) {
    console.log("message pas OP");
    errorOnMess = true;
    errDivMess.innerHTML = dataError.message;
  }
  errDivMess.style.display = errorOnMess ? 'block' : 'none';
}

// Fonction pour valider les entrées
function validation() {
  console.log("test validation", errorOnFirst, errorOnLast, errorOnEmail, errorOnMess);
  if (errorOnFirst == false && errorOnLast == false && errorOnEmail == false && errorOnMess == false) {
    form.style.display = "none";

    console.log("Prénom:", firstName.value.trim());
    console.log("Nom:", lastName.value.trim());
    console.log("Email:", email.value.trim());
    console.log("Message:", message.value.trim());

    restoreDefaultTabOrder();

    reset();
  }
}

// Fonction pour lancer les fonction qui vont checker toutes les entrées
function check() {
  console.log("check");
  firstNameCheck();
  lastNameCheck();
  emailCheck();
  messCheck();

  validation();
}

function reset() {
  console.log("reset");
  form.reset();
  errorOnFirst = true;
  errorOnLast = true;
  errorOnEmail = true;
  errorOnMess = true;
}


// écouter le bouton submit et lancer la fonction check au clic
form.addEventListener('submit', function (event) {
  event.preventDefault();
  check();
});