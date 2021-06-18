import * as basicLightbox from 'basiclightbox';

export const randomColor = (min = 0, max = 255) => {
  const first = Math.round(Math.random() * (max - min) + min);
  const second = Math.round(Math.random() * (max - min) + min);
  const third = Math.round(Math.random() * (max - min) + min);
  return `rgb(${first}, ${second}, ${third})`;
};

export const createBoxes = (node, amount, initialSize) => {
  clear(node);
  for (let i = 0; i < +amount; i += 1) {
    const size = initialSize + i * 10;
    const box = document.createElement('div');
    box.style = `width: ${size}px; height:${size}px; background-color:${randomColor()}`;
    node.appendChild(box);
  }
};

export const clear = node => {
  node.innerHTML = '';
};

export const getImage = (request, keyApi, page) => {
  const baseURL = 'https://pixabay.com/api/';
  const params = `?image_type=photo&orientation=horizontal&q=${request}&page=${page}&per_page=20&key=${keyApi}`;
  return fetch(baseURL + params)
    .then(resp => {
      return resp.json();
    })
    .then(images => images.hits)
    .catch(err => err);
};

export const appendImages = (node, searchValue, keyApi, page) => {
  getImage(searchValue, keyApi, page).then(images => {
    if (images.length !== 0) {
      images.map(image => {
        return node.insertAdjacentHTML(
          'beforeend',
          `<li>
                    <a>
                        <img
                            src="${image.webformatURL}"
                            data-source=${image.largeImageURL}
                            alt="${image.tags}"
                        />
                    </a>
                </li>`,
        );
      });
    }
  });
};

export const createPhotoModal = (img, alt) =>
basicLightbox.create(`<img width="800" height="600" src="${img}" alt="${alt}">`).show();