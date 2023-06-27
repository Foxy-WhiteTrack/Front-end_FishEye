
function displayLightbox(photographer, media, mediaFolder) {
    const mediaSort = sortMedia(media);

    let lighboxHtml = '';

    mediaSort.forEach((item) => {
        const firstName = photographer.name.split(' ')[0];
        const newFirstName = firstName.replace('-', ' ');
        const mediaFolder = newFirstName;
        const imgPath = `assets/images/${mediaFolder}/${item.image}`;

        const mediaElement = mediaFactory(item, mediaFolder);
        lighboxHtml += `<div id="media_${item.id}" class="">${mediaElement}</div>`;
        lighboxHtml += `<img id="lightbox_image" src="" alt="" class="lightbox-image">`;
    });

    mediaContainer.innerHTML = lighboxHtml;

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