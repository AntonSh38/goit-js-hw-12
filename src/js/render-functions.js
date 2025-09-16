import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const listEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

function renderGallery(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
          <div class="info">
            <div class="info-item">
              <span class="info-label">Likes</span>
              <span class="info-value">${likes}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Views</span>
              <span class="info-value">${views}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Comments</span>
              <span class="info-value">${comments}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Downloads</span>
              <span class="info-value">${downloads}</span>
            </div>
          </div>
        </a>
      </li>`;
      }
    )
    .join('');
}

export function createGallery(photosArr) {
  listEl.innerHTML = renderGallery(photosArr);
  gallery.refresh();
}

export function appendGallery(photosArr) {
  listEl.insertAdjacentHTML('beforeend', renderGallery(photosArr));
  gallery.refresh();
}

export function clearGallery() {
  listEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtnEl.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtnEl.classList.add('is-hidden');
}
