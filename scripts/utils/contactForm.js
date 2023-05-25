let formCtn = document.getElementById('form-ctn');
let panel = document.getElementById('contact_modal');
let background = document.getElementById('bg-panel');

function createThanks() {
  const formPanel = document.getElementById('form-panel');
  formPanel.style.display = "block";

}

function deleteForm() {
  formCtn.innerHTML = ``;
}


function createForm() {
  background.style.display = 'block';

  // désactiver en lecture clavier les élements de fond
  const tabIndexed = document.querySelectorAll('.access');
  tabIndexed.forEach((tabIndex) => {
    tabIndex.setAttribute('tabindex', '-1')
  });
  formCtn.style.display = "block";
}

function createErrorMessage(field, message) {
  const error = document.createElement('div');
  field.classList.add('error');
  error.classList.add('error-message');
  error.innerHTML = message;
}