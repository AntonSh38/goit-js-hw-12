import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  appendGallery,
} from './js/render-functions.js';

const formEl = document.querySelector('.form');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  const inputQuery = event.currentTarget.elements['search-text'].value.trim();

  if (!inputQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'please enter a search query',
    });
    formEl.reset();
    return;
  }

  currentQuery = inputQuery;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (!data || !data.hits || !Array.isArray(data.hits)) {
      iziToast.error({
        title: 'Error',
        message: 'Invalide response from server. Please try again.',
      });
      return;
    }

    const photosArr = data.hits;
    const totalHits = data.totalHits || 0;

    if (photosArr.length === 0) {
      iziToast.error({
        title: 'Error',
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
      });
      return;
    }

    createGallery(photosArr);

    const totalPages = Math.ceil(totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
    formEl.reset();
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (!data || !data.hits || !Array.isArray(data.hits)) {
      iziToast.error({
        title: 'Error',
        message: 'Invalid response from server. Please try again',
      });
      return;
    }

    const photosArr = data.hits;
    const totalHits = data.totalHits || 0;

    appendGallery(photosArr);

    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const cardHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    const totalPages = Math.ceil(totalHits / perPage);
    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error('Error fetching more images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
}
