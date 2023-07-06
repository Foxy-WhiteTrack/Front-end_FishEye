function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  lightbox.style.display = 'none';
}

document.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
