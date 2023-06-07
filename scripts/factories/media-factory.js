// media factory
export function mediaFactory(item, mediaFolder) {
  if (item.image) {
    const imgPath = `assets/images/${mediaFolder}/${item.image}`;
    const mediaHtml = `<article>
      <figure>
        <div class="media_item">
          <a>
            <img class="media_obj"  src="${imgPath}" tabindex="-1" alt="${item.title}" aria-label="${item.title}, closeup view">
          </a>
        </div>
        <div class="infos-medias">
          <figcaption>${item.title}</figcaption>
          <div class="likes">
            <h3>${item.likes}</h3>
            <div>
              <i id="like_${item.id}" tabindex="0" class="fa-regular fa-heart" aria-label="likes" role="button"></i>
            </div>
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
          <a>
          <video class="media_obj" src="${videoPath}" tabindex="-1" aria-label="${item.title}, closeup view"></video>
          </a>
        </div>
        <div class="infos-medias">
          <figcaption>${item.title}</figcaption>
          <div class="likes">
            <h3>${item.likes}</h3>
            <div>
              <i id="like_${item.id}" tabindex="0" class="fa-regular fa-heart" aria-label="likes" role="button"></i>
            </div>
          </div>
        </div>
      </figure>
    </article>`;
    return mediaHtml;
  }
}
