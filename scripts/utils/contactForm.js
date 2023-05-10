// fonction pour afficher la modale
function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
}

// fonction pour fermer la modale
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

function createBackground() {
  const background = document.createElement('div');
  background.classList.add('modal_background');
  document.body.insertBefore(background, document.body.firstChild);
}

function createForm() {
  const form = `
    <div class="modal" tabindex="0">
      <div class="modal_header">
      <h2>Contactez-moi<br>Photographer Name</h2>
      <img src="assets/icons/close.svg" alt="fermeture" class="close" tabindex="0"/>
      </div>
      <form action="#" method="POST">
        <div class="form-group">
          <label class="form-label" for="firstname">Prénom</label>
          <input class="text" id="firstname" name="firstname" type="text">
        </div>
        <div class="form-group">
          <label class="form-label" for="lastname">Nom</label>
          <input class="text" id="lastname" name="lastname" type="text">
        </div>
        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input class="text" id="email" name="email" type="text">
        </div>
        <div class="form-group">
          <label class="form-label" for="message">Votre message</label>
          <input class="text" id="message" name="message" type="text">
        </div>
        <input class="contact_button close_button" type="submit" value="Envoyer">

      </form>
    </div>
  `;

  // désactiver en lecture clavier les élements de fond
  const tabIndexed = document.querySelectorAll('.access');
  tabIndexed.forEach((tabIndex) => {
    tabIndex.setAttribute('tabindex', '-1')
  });
}

function createErrorMessage(field, message) {
  const error = document.createElement('div');
  field.classList.add('error');
  error.classList.add('error-message');
  error.innerHTML = message;
}