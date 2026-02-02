import { Notify } from 'notiflix';
import handlerStartBtn from './exercises_card.js';
import { addExerciseRatingById } from './api.js';

const formCloseBtn = document.getElementById('form-close-btn');
const backdrop = document.querySelector('.backdrop');
const userEmail = document.querySelector('#user-email');
const userComment = document.getElementById('user-comment');
const formSendBtn = document.querySelector('.form-send-btn');
const ratingWrapper = document.querySelector('.rating-wrapper');
const ratingStarValue = document.querySelector('.rating-star-value');
const backdropForm = document.querySelector('.backdrop-form');

let exerciseId = null;
let previousExercise = null;

const userFeedback = {
  rate: 0,
  email: '',
  comment: '',
};

function resetForm() {
  userEmail.value = '';
  userComment.value = '';
  userFeedback.rate = 0;
  userFeedback.comment = '';
  userFeedback.email = '';
  ratingStarValue.textContent = '0.0';
  const ratingStarIcons = document.querySelectorAll('.rating-star-icons');
  ratingStarIcons.forEach(icon => {
    icon.style.fill = 'var(--white-20)';
  });
}

function handleEscClose(event) {
  if (event.key === 'Escape') closeRateModal(true);
}

function closeRateModal(returnCard = false) {
  backdrop.classList.remove('is-open');
  document.removeEventListener('keydown', handleEscClose);
  if (returnCard && previousExercise) handlerStartBtn(previousExercise);
}

formCloseBtn.addEventListener('click', () => closeRateModal(true));
backdrop.addEventListener('click', event => {
  if (event.target === backdrop) closeRateModal(true);
});

ratingWrapper.addEventListener('click', event => {
  if (!event.target.dataset.id) return;
  userFeedback.rate = Number(event.target.dataset.id);
  ratingStarValue.textContent = `${userFeedback.rate}.0`;

  const ratingStarIcons = document.querySelectorAll('.rating-star-icons');
  for (let i = 0; i < 5; i++) {
    ratingStarIcons[i].style.fill =
      i < userFeedback.rate ? 'var(--orange-color)' : 'var(--white-20)';
  }
});

export function handlerOpenRate(id, exercise = null) {
  exerciseId = id;
  previousExercise = exercise;
  backdrop.classList.add('is-open');
  document.addEventListener('keydown', handleEscClose);
}

backdropForm.addEventListener('submit', async event => {
  event.preventDefault();
  userFeedback.email = userEmail.value.trim();
  userFeedback.comment = userComment.value.trim() || undefined;

  if (!userFeedback.rate) {
    Notify.failure('Please select a rating');
    return;
  }

  if (!userFeedback.email) {
    Notify.failure('Please enter your email');
    return;
  }

  try {
    await addExerciseRatingById(exerciseId, userFeedback);
    Notify.success('Your rating has been saved!');
    resetForm();
    closeRateModal();
  } catch (error) {
    Notify.failure(error.message || 'Something went wrong');
  }
});
