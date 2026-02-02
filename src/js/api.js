let page = 1;
let limit = window.innerWidth < 768 ? 9 : 12;
let limitx = window.innerWidth < 768 ? 8 : 10;

let currentFilter = 'Muscles';
let searchQuery = ''; 
let keyWord = ''; 
let filter = '';
let name = '';

let localResponse = [];

export {
  page,
  limit,
  limitx,
  currentFilter,
  searchQuery,
  keyWord,
  filter,
  name,
  localResponse,
};

export function setCurrentFilter(value) {
  currentFilter = value;
}

export function setPage(value) {
  page = value;
}

export function setFilter(value) {
  filter = value;
}

export function setName(value) {
  name = value;
}

export function setKeyword(value) {
  keyWord = value;
}

export function setSearchQuery(value) {
  searchQuery = value;
}

export async function fetchFilterss(reset = true) {
  if (reset) page = 1;

  let url = `https://your-energy.b.goit.study/api/filters?filter=${currentFilter}&page=${page}&limit=${limit}`;

  if (searchQuery.trim()) {
    url += `&name=${searchQuery}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch filters');
  return await res.json();
}

export async function fetchExercisesAPI(reset = true) {
  if (reset) localResponse.length = 0;

  let preparedFilter = filter.toLowerCase();
  if (preparedFilter === 'body parts') preparedFilter = 'bodypart';

  const url = `
    https://your-energy.b.goit.study/api/exercises?
    ${preparedFilter}=${name}
    &keyword=${keyWord}
    &page=${page}
    &limit=${limitx}
  `.replace(/\s+/g, '');

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch exercises');
  return await res.json();
}

export async function postSubscriptions(email) {
  const response = await fetch(
    'https://your-energy.b.goit.study/api/subscription',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  );

  if (response.status === 409) throw new Error('EMAIL_EXISTS');
  if (!response.ok) throw new Error('REQUEST_FAILED');

  return await response.json();
}

export async function addExerciseRatingById(id, { email, rate, comment }) {
  rate = Number(rate);

  const response = await fetch(
    `https://your-energy.b.goit.study/api/exercises/${id}/rating`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, rate, review: comment }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Rating failed');
  }

  return response.json();
}
