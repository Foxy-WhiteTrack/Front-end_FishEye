function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    const mediaType = image ? 'image' : 'video';
    const mediaPath = image || video;

    function getMediaDOM() {
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media');

        const mediaElement = mediaType === 'image'

            // Attention j'ai mal mis en place le dossier du photographe !!! C'est à terminer !!!
            ? `<img class="media__img" src="assets/images/${mediaPath}" alt="${title}">`
            : `<video class="media__video" src="assets/images/${mediaPath}" controls></video>`;

        const mediaContent = `
        <div class="media__element" tabindex="0">
          ${mediaElement}
        </div>
        <div class="media__info">
          <p class="media__title">${title}</p>
          <div class="media__likes">
            <p>${likes}</p>
            
          </div>
        </div>
      `;

        mediaContainer.innerHTML = mediaContent;

        return mediaContainer;
    }

    return { getMediaDOM };
}
