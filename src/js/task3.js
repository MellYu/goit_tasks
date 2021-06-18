import { appendImages, clear, createPhotoModal } from '../utils';
const body = document.body;
const inputRef = document.getElementById('search-form');
const gallery = document.createElement('ul');
const intersectingContainer = document.createElement('div');

const keyApi = '22109419-ce4d58a16a94de839f0f62cea';
let page = 1;
let searchRequest = '';

intersectingContainer.classList.add('intersectingContainer')
body.appendChild(gallery);
body.appendChild(intersectingContainer);

inputRef.addEventListener('submit', e => {
  e.preventDefault();
  clear(gallery);
  page += 1;
  const searchValue = e.currentTarget.elements.query.value;
  appendImages(gallery, searchValue, keyApi, page);
  return (searchRequest = searchValue);
});

gallery.addEventListener('click', e => {
  const image = e.target;
  createPhotoModal(image.dataset.source, image.getAttribute('alt'));
});


const options = { threshold: 0.05 };
const observer = new IntersectionObserver(entries => {
  entries.map(entry => {
    if (entry.isIntersecting) {
      if (page > 1) {
        page += 1;
        appendImages(gallery, searchRequest, keyApi, page);
      }
    }
  });
}, options);
observer.observe(intersectingContainer);
