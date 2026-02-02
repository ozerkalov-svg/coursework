import { getFav, addToFav, removeFromFav } from './localalStorageLogical';
import { checkStorage } from './favourite_exercises';
import { handlerOpenRate } from './rate';

const cardBackdrop = document.querySelector('.exr-card-backdrop');

let currentExercise = null;
let isFavourite = false;

function capitalizeFirstLetter(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export default function handlerStartBtn(
  exercise,
  isFav = false,
  isFavouritePage = false
) {
  currentExercise = exercise;

  const favs = getFav();
  isFavourite = favs.some(item => item._id === exercise._id);

  renderModal(exercise);

  cardBackdrop.classList.add('card-is-open');
  document.body.classList.add('not-scrollable');

  document.addEventListener('keydown', handleEscClose);
}

function renderModal(data) {
  let rating = data.rating;
  if (rating % 1 === 0) rating += '.0';
  rating = parseFloat(rating).toFixed(1);

  const markup = `
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
        <svg class="close-card-icon">
          <use href="/coursework/symbol-defs.svg#icon-x"></use>
        </svg>
      </button>

      <img src="${data.gifUrl}" alt="exercise" class="exr-image" />

      <div>
        <h3 class="exercise-name">${capitalizeFirstLetter(data.name)}</h3>

        <div class="rating-container">
          <ul class="star-rating-list">
            <li><p class="rating-score">${rating}</p></li>
            ${Array(5)
              .fill('')
              .map(
                () => `
              <li>
                <svg class="star-rating-icon" width="14" height="14">
                  <use href="/coursework/symbol-defs.svg#icon-star"></use>
                </svg>
              </li>`
              )
              .join('')}
          </ul>
        </div>

        <div class="exr-information-container">
          <div class="exr-info-block">
            <p class="info-label">Target</p>
            <p class="exr-info">${capitalizeFirstLetter(data.target)}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Body Part</p>
            <p class="exr-info">${capitalizeFirstLetter(data.bodyPart)}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Equipment</p>
            <p class="exr-info">${capitalizeFirstLetter(data.equipment)}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Popular</p>
            <p class="exr-info">${data.popularity}</p>
          </div>
          <div class="exr-info-block">
            <p class="info-label">Burned Calories</p>
            <p class="exr-info">${data.burnedCalories}/${data.time} min</p>
          </div>
        </div>

        <p class="exr-description">${data.description}</p>

        <div class="buttons-cont">
          <button class="add-favourite-btn">
            ${isFavourite ? 'Remove from favourites' : 'Add to favourites'}
            <svg class="heart-icon" width="20" height="20">
              <use href="/coursework/symbol-defs.svg#icon-heart"></use>
            </svg>
          </button>
          <button class="give-rating-btn">Give a rating</button>
        </div>
      </div>
    </div>
  `;

  cardBackdrop.innerHTML = markup;

  const stars = document.querySelectorAll('.star-rating-icon');
  for (let i = 0; i < Math.round(data.rating); i++) {
    stars[i].style.fill = '#eea10c';
  }

  const addFavBtn = document.querySelector('.add-favourite-btn');

  addFavBtn.addEventListener('click', () => {
    if (!isFavourite) {
      addToFav(data);
      isFavourite = true;
      addFavBtn.innerHTML = `Remove from favourites
        <svg class="heart-icon" width="20" height="20">
          <use href="/coursework/symbol-defs.svg#icon-heart"></use>
        </svg>`;
    } else {
      removeFromFav(data._id);
      isFavourite = false;
      addFavBtn.innerHTML = `Add to favourites
        <svg class="heart-icon" width="20" height="20">
          <use href="/coursework/symbol-defs.svg#icon-heart"></use>
        </svg>`;
    }

    checkStorage();
  });

  document.getElementById('close-card').addEventListener('click', closeModal);

  cardBackdrop.addEventListener('click', e => {
    if (e.target === cardBackdrop) closeModal();
  });

  document.querySelector('.give-rating-btn').addEventListener('click', () => {
    closeModal();
    handlerOpenRate(data._id, currentExercise);
  });
}

function handleEscClose(event) {
  if (event.key === 'Escape') closeModal();
}

function closeModal() {
  cardBackdrop.classList.remove('card-is-open');
  document.body.classList.remove('not-scrollable');
  document.removeEventListener('keydown', handleEscClose);
}
