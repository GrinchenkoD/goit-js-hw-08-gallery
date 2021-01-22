import galleryArr from './gallery-items.js';
{
  /* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>; */
}
const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const lightboxImgRef = document.querySelector('.lightbox__image');
// ===========================================================

// ===========================================================

galleryArr.forEach(elem => {
  galleryRef.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${elem.original}"
        >
          <img
            class="gallery__image"
            src="${elem.preview}"
            data-source="${elem.original}"
            alt="${elem.description}"
          />
        </a>
      </li>`,
  );
});
galleryRef.addEventListener('click', modalOpen);

function modalClose(event) {
  if (
    event.target.dataset.action === 'close-lightbox' ||
    event.target.classList.contains('lightbox__overlay')
  ) {
    modalRef.classList.remove('is-open');
    lightboxImgRef.src = '';
  }
}
function modalEscClose(event) {
  if (event.key === 'Escape') {
    modalRef.classList.remove('is-open');
    lightboxImgRef.src = '';
    document.removeEventListener('keydown', modalEscClose);
    modalRef.removeEventListener('click', modalClose);
  }
}

function modalOpen(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  modalRef.classList.add('is-open');
  lightboxImgRef.src = event.target.dataset.source;
  lightboxImgRef.alt = event.target.alt;
  modalRef.addEventListener('click', modalClose);
  document.addEventListener('keydown', modalEscClose);
}
