import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const dataList = document.querySelector('#data-list');
const loadMore = document.querySelector('.load-btn');

let currentPage = 1;
let currentSearchQuery = '';
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', submitHandler);
async function submitHandler(event) {
  event.preventDefault();
  const searchCriteria = event.target.elements['search-text'].value.trim();
  if (!searchCriteria) {
    iziToast.error({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  currentSearchQuery = searchCriteria;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchCriteria, (currentPage = 1));
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    createGallery(data.hits);

    if (currentPage * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    event.target.reset();
  }
}

loadMore.addEventListener('click', loadMoreHandler);

async function loadMoreHandler() {
  currentPage++;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentSearchQuery, currentPage);
    createGallery(data.hits);

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      left: 0,
      behavior: 'smooth',
    });

    if (currentPage * PER_PAGE >= totalHits) {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch more images. Please try again.',
      position: 'topRight',
    });
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
}
