import handlerStartBtn from './exercises_card.js';
import { displayQuote } from './localalStorageLogical.js';
import {
  fetchFilterss,
  fetchExercisesAPI,
  page,
  currentFilter,
  localResponse,
  setFilter,
  setName,
  setCurrentFilter,
  setPage,
  filter,
  setKeyword, 
} from './api.js';

const refs = {
  filters: document.querySelector('.filters'),
  navButtons: document.querySelector('.nav-buttons'),
  musclesBtn: document.querySelector('.muscles-btn'),
  exercisesTitle: document.querySelector('.exercises-title'),
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-form input'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  quoteContainer: document.querySelector('.quote'),
  pagination: document.querySelector('.pagination'),
  exercises: document.querySelector('.exercises'),
};

displayQuote(refs.quoteContainer);
fetchFilters();
refs.musclesBtn.classList.add('active-btn');

refs.filters.addEventListener('click', pressFilterBtn);
refs.exercises.addEventListener('click', loadExercises);
refs.searchForm.addEventListener('submit', onSearchSubmit);

refs.loadMoreBtn?.addEventListener('click', loadMore);
refs.pagination?.addEventListener('click', onPaginationClick);
refs.exercises.addEventListener('click', onStartClick);

async function fetchFilters(reset = true) {
  if (reset) refs.exercises.innerHTML = '';

  const data = await fetchFilterss(reset);
  if (!data.results.length) return showNoResults();

  makeFilterCards(data.results);
  renderPagination(data.totalPages);
}

function makeFilterCards(items) {
  const markup = items
    .map(
      ({ name, filter, imgURL }) => `
      <li class="exercise">
        <img src="${imgURL}" alt="${name}" loading="lazy" class="exercise-image" />
        <div class="exercise-info">
          <h2 class="exercise-subtitle">${capitalize(name)}</h2>
          <p class="exercise-filter">${filter}</p>
        </div>
      </li>
    `
    )
    .join('');

  refs.exercises.insertAdjacentHTML('beforeend', markup);
}

function pressFilterBtn(event) {
  if (event.target.tagName !== 'BUTTON') return;

  document.querySelector('.active-btn')?.classList.remove('active-btn');
  event.target.classList.add('active-btn');

  if (event.target.classList.contains('muscles-btn'))
    setCurrentFilter('Muscles');
  if (event.target.classList.contains('bodyparts-btn'))
    setCurrentFilter('Body parts');
  if (event.target.classList.contains('equipment-btn'))
    setCurrentFilter('Equipment');

  refs.exercisesTitle.textContent = 'Exercises';
  refs.searchForm.style.display = 'none';
  setKeyword('');
  setPage(1);

  fetchFilters(true);
}

async function loadExercises(event) {
  const card = event.target.closest('.exercise');
  if (!card) return;

  const filterEl = card.querySelector('.exercise-filter');
  const nameEl = card.querySelector('.exercise-subtitle');
  if (!filterEl || !nameEl) return;

  setFilter(filterEl.textContent);
  setName(nameEl.textContent.toLowerCase());
  setKeyword('');

  refs.exercisesTitle.innerHTML = `Exercises / <span>${capitalize(
    nameEl.textContent
  )}</span>`;

  refs.searchForm.style.display = 'block';
  refs.searchInput.value = '';
  setPage(1);
  refs.exercises.innerHTML = '';

  await fetchExercises(true);
}

async function fetchExercises(reset = true) {
  if (reset) localResponse.length = 0;

  const data = await fetchExercisesAPI(reset);
  if (!data.results.length) return showNoResults();

  localResponse.length = 0;
  localResponse.push(...data.results);

  makeExercisesCards(data.results);
  renderPagination(data.totalPages);
}

function makeExercisesCards(items) {
  const markup = `
    <ul class="exercises-cards">
      ${items
        .map(
          ({ name, _id, rating, burnedCalories, bodyPart, target, time }) => `
        <li class="exercise-information" data-id-card="${_id}">
          <div class="top-nav">
            <div>
              <p class="tag">Workout</p>
              <span class="rating">
                ${rating}
                <svg class="star-icon" width="14" height="14">
                  <use href="/coursework/symbol-defs.svg#icon-star"></use>
                </svg>
              </span>
            </div>
            <button data-action="start" data-id="${_id}" class="details-link">
              Start
              <svg class="arrow-icon" width="16" height="16">
                <use href="/coursework/symbol-defs.svg#icon-arrow"></use>
              </svg>
            </button>
          </div>
          <div class="exercise-header">
            <svg class="icon-man" width="24" height="24">
              <use href="/coursework/symbol-defs.svg#icon-run"></use>
            </svg>
            <h2 class="exercise-name">${capitalize(name)}</h2>
          </div>
          <ul class="exercise-details">
            <li><span>Burned calories:</span> ${burnedCalories} / ${time} min</li>
            <li><span>Body part:</span> ${capitalize(bodyPart)}</li>
            <li><span>Target:</span> ${capitalize(target)}</li>
          </ul>
        </li>
      `
        )
        .join('')}
    </ul>
  `;

  refs.exercises.innerHTML = markup;
}

function onSearchSubmit(e) {
  e.preventDefault();

  const value = refs.searchInput.value.trim().toLowerCase();
  setKeyword(value);
  setPage(1);

  refs.exercises.innerHTML = '';
  fetchExercises(true);
}


function onPaginationClick(e) {
  const btn = e.target.closest('.pagination-btn');
  if (!btn) return;

  const selectedPage = Number(btn.dataset.page);
  if (selectedPage === page) return;

  setPage(selectedPage);
  refs.exercises.innerHTML = '';
  filter ? fetchExercises(false) : fetchFilters(false);
}

function onStartClick(event) {
  const btn = event.target.closest('[data-action="start"]');
  if (!btn) return;

  const exercise = localResponse.find(el => el._id === btn.dataset.id);
  handlerStartBtn(exercise);
}

function showNoResults() {
  refs.exercises.innerHTML = `
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `;
  refs.loadMoreBtn?.style.setProperty('display', 'none');
  refs.pagination && (refs.pagination.innerHTML = '');
}

function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
}

function renderPagination(totalPages) {
  if (!refs.pagination || totalPages <= 1) {
    refs.pagination.innerHTML = '';
    return;
  }

  let html = '';
  const createBtn = p => `
    <li>
      <button class="pagination-btn ${p === page ? 'active' : ''}" data-page="${p}">
        ${p}
      </button>
    </li>
  `;

  let start = Math.max(1, page - 1);
  let end = Math.min(totalPages, page + 1);

  if (page === 1) end = Math.min(totalPages, 3);
  if (page === totalPages) start = Math.max(1, totalPages - 2);

  if (start > 1) {
    html += createBtn(1);
    if (start > 2) html += `<li class="dots">...</li>`;
  }

  for (let i = start; i <= end; i++) html += createBtn(i);

  if (end < totalPages) {
    if (end < totalPages - 1) html += `<li class="dots">...</li>`;
    html += createBtn(totalPages);
  }

  refs.pagination.innerHTML = html;
}
