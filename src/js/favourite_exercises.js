import handlerStartBtn from './exercises_card.js';
import * as localalStorageLogical from './localalStorageLogical';
import * as header from './header';

import {
  getFav,
  removeFromFav,
  LS_FAV,
  displayQuote,
} from './localalStorageLogical.js';


const refs = {
  cardSet: document.querySelector('.fav_card_list'),
  noCards: document.querySelector('.no_cards_wrapper'),
  quoteContainer: document.querySelector('.quote'),
  noCardsContainer: document.querySelector('.no_cards_wrapper-container'),
  paginationCards: document.querySelector('.pagination-cards'),
};

let page = 1;
const CARDS_PER_PAGE = 8;


const getCardsByPage = (arr, page) => {
  const start = (page - 1) * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  return arr.slice(start, end);
};

const uniqueIdFilter = (arr = []) => {
  const uniqueIds = new Set();
  return arr.filter(obj => {
    if (!obj?._id) return false;
    if (uniqueIds.has(obj._id)) return false;
    uniqueIds.add(obj._id);
    return true;
  });
};


const renderCards = arr => {
  const markup = arr
    .map(({ name, _id, burnedCalories, bodyPart, target, time = 3 }) => {
      let calories = `${burnedCalories} / ${time} min`;

      return `
        <li class="exercise-information" data-id-card="${_id}" data-component="fav_card">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              <button
                name="trash"
                data-id-del-btn="${_id}"
                data-action="delete_fav_card"
                class="trash-btn">
                <svg class="trash-icon" width="16" height="16">
                  <use href="/coursework/symbol-defs.svg#icon-trash"></use>
                </svg>
              </button>
            </div>

            <div class="actions">
              <button
                name="start"
                data-id-start-btn="${_id}"
                data-action="start_exercise_btn"
                class="details-link">
                Start
                <svg class="arrow-icon" width="16" height="16">
                  <use href="/coursework/symbol-defs.svg#icon-arrow"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="exercise-header">
            <svg class="icon-man" width="24" height="24">
              <use href="/coursework/symbol-defs.svg#icon-run"></use>
            </svg>
            <h2 class="exercise-name">${name}</h2>
          </div>

          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${calories}</li>
            <li><span>Body part:</span> ${bodyPart}</li>
            <li><span>Target:</span> ${target}</li>
          </ul>
        </li>
      `;
    })
    .join('');

  refs.cardSet.innerHTML = markup;
};


const onClick = e => {
  const startBtn = e.target.closest('[data-action="start_exercise_btn"]');
  const deleteBtn = e.target.closest('[data-action="delete_fav_card"]');

  if (!startBtn && !deleteBtn) return;

  if (deleteBtn) {
    removeFromFav(deleteBtn.dataset.idDelBtn);
    checkStorage();
    return;
  }

  if (startBtn) {
    const favs = getFav(LS_FAV) || [];
    const exercise = favs.find(el => el._id === startBtn.dataset.idStartBtn);

    if (exercise) {
      handlerStartBtn(exercise, true, true);
    }
  }
};

if (refs.cardSet) {
  refs.cardSet.addEventListener('click', onClick);
}


function renderPaginationCards(totalPages) {
  if (!refs.paginationCards) return;

  if (totalPages <= 1) {
    refs.paginationCards.innerHTML = '';
    return;
  }

  refs.paginationCards.innerHTML = Array.from(
    { length: totalPages },
    (_, i) => `
      <li>
        <button
          name="pagination"
          class="pagination-btn ${page === i + 1 ? 'active' : ''}"
          data-page="${i + 1}">
          ${i + 1}
        </button>
      </li>
    `
  ).join('');
}

if (refs.paginationCards) {
  refs.paginationCards.addEventListener('click', e => {
    const btn = e.target.closest('.pagination-btn');
    if (!btn) return;

    page = Number(btn.dataset.page);
    checkStorage();
  });
}


export const checkStorage = () => {
  if (!document.querySelector('.favourite_exercises')) return;

  const favsRaw = getFav(LS_FAV) || [];
  const favs = uniqueIdFilter(favsRaw);

  if (!favs.length) {
    refs.noCards.classList.remove('visually-hidden');
    refs.noCardsContainer.classList.remove('visually-hidden');
    refs.cardSet.classList.add('visually-hidden');
    refs.paginationCards.innerHTML = '';
    return;
  }

  refs.noCards.classList.add('visually-hidden');
  refs.noCardsContainer.classList.add('visually-hidden');
  refs.cardSet.classList.remove('visually-hidden');

  if (window.innerWidth < 1440) {
    const totalPages = Math.ceil(favs.length / CARDS_PER_PAGE);
    if (page > totalPages) page = totalPages;

    renderCards(getCardsByPage(favs, page));
    renderPaginationCards(totalPages);
  } else {
    renderCards(favs);
    refs.paginationCards.innerHTML = '';
  }
};


window.addEventListener('resize', () => {
  page = 1;
  checkStorage();
});

checkStorage();
displayQuote(refs.quoteContainer);
