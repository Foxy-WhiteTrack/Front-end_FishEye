function openLightbox(imgSrc, imgAlt) {
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox__img');

  lightboxImg.src = imgSrc;
  lightboxImg.alt = imgAlt;
  lightbox.style.display = 'block';
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  lightbox.style.display = 'none';
}

function displayMedia(photographer, media) {
  media.forEach((item) => {
    if (item.image) {
      const imgElem = document.createElement('img');
      imgElem.classList.add('media_obj');
      imgElem.src = imgPath;
      imgElem.alt = item.title;
      imgElem.addEventListener('click', () => openLightbox(imgPath, item.title));
      mediaItem.appendChild(imgElem);
    } else if (item.video) {
      const videoElem = document.createElement('video');
      videoElem.classList.add('media_obj');
      videoElem.src = videoPath;
      videoElem.controls = true;
      videoElem.addEventListener('click', () => openLightbox(videoPath, item.title));
      mediaItem.appendChild(videoElem);
    }
  });
}

document.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
