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

document.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
