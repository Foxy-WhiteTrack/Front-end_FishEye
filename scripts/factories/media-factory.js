// Media Factory
export function mediaFactory(item, mediaFolder) {
  if (item.image) {
    const imgPath = `assets/images/${mediaFolder}/${item.image}`;
    const mediaHtml = `<article>
    <figure>
    <div class="media_item">
      <a href="">
        <img class="media_obj" src="${imgPath}" tabindex="0" alt="${item.title}">
      </a>
    </div>
    <div class="infos-medias">
      <figcaption>${item.title}</figcaption>
      <div class="likes">
      <h3>${item.likes}</h3>
      <div><i class="fa-solid fa-heart"></i></div>
      </div>
    </div>
  </figure>
</article>`;
    return mediaHtml;
  } else if (item.video) {
    const videoPath = `assets/images/${mediaFolder}/${item.video}`;
    const mediaHtml = `<article>
  <figure>
    <div class="media_item">
      <a href="">
        <video class="media_obj" src="${videoPath}" tabindex="0" controls></video>
      </a>
    </div>
    <div class="infos-medias">
      <figcaption>${item.title}</figcaption>
      <div class="likes">
      <h3>${item.likes}</h3>
      <div><i class="fa-solid fa-heart"></i></div>
      </div>
    </div>
  </figure>
</article>`;
    return mediaHtml;
  }
}

// Fonction pour afficher les médias du photographe
export function displayMedia(photographer, media) {
  const mediaContainer = document.querySelector('#media_container');
  let mediaHtml = '';
  console.log(media);

  media.forEach((item) => {
    const firstName = photographer.name.split(' ')[0];
    const newFirstName = firstName.replace('-', ' ');
    const mediaFolder = newFirstName;

    mediaHtml += mediaFactory(item, mediaFolder);
  });

  mediaContainer.innerHTML = mediaHtml;
}
