export const LS_FAV = 'favourites_exercises';

export const getFav = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_FAV)) || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const setFav = arr => {
  localStorage.setItem(LS_FAV, JSON.stringify(arr));
};

export const addToFav = exercise => {
  const favs = getFav();
  if (favs.some(item => item._id === exercise._id)) return;
  favs.push(exercise);
  setFav(favs);
};

export const removeFromFav = id => {
  const updatedFavs = getFav().filter(item => item._id !== id);
  setFav(updatedFavs);
};


const QUOTE_KEY = 'todays_quote';
const QUOTE_TIME_KEY = 'quote_time';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

let cachedQuote = null;
let quotePromise = null;

async function getQuote() {
  if (cachedQuote) return cachedQuote;
  if (quotePromise) return quotePromise;

  const storedQuote = localStorage.getItem(QUOTE_KEY);
  const storedTime = localStorage.getItem(QUOTE_TIME_KEY);

  if (
    storedQuote &&
    storedTime &&
    Date.now() - Number(storedTime) < ONE_DAY_MS
  ) {
    cachedQuote = JSON.parse(storedQuote);
    return cachedQuote;
  }

  quotePromise = fetch('https://your-energy.b.goit.study/api/quote')
    .then(res => res.json())
    .then(data => {
      cachedQuote = data;
      localStorage.setItem(QUOTE_KEY, JSON.stringify(data));
      localStorage.setItem(QUOTE_TIME_KEY, Date.now().toString());
      return data;
    })
    .catch(err => {
      console.error('Error fetching quote:', err);
      if (storedQuote) {
        cachedQuote = JSON.parse(storedQuote);
        return cachedQuote;
      }
      return { quote: 'No quote available', author: '' };
    })
    .finally(() => {
      quotePromise = null;
    });

  return quotePromise;
}

const renderQuoteHTML = (quote, author) => `
  <svg width="32" height="32" class="quote-text-icon">
    <use href="/coursework/symbol-defs.svg#icon-run"></use>
  </svg>
  <div>
    <h3 class="main-quote-title">Quote of the day</h3>
    <p class="main-quote-text">${quote}</p>
    <p class="main-quote-author">${author}</p>
    <svg width="24" height="24" class="quote-text-icon-commas">
      <use href="/coursework/symbol-defs.svg#icon-commas"></use>
    </svg>
  </div>
`;

export const displayQuote = async quoteContainer => {
  const { quote, author } = await getQuote();
  quoteContainer.innerHTML = renderQuoteHTML(quote, author);
};

