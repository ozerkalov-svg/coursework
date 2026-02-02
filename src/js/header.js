const navLinkFav = document.querySelector('.header-nav-link-favorites');
const navLinkHome = document.querySelector('.header-nav-link-main');

const page = window.PAGE;

if (page === 'favorites') {
  navLinkFav.classList.add('active');
}
if (page === 'main') {
  navLinkHome.classList.add('active');
}


const openMenuButton = document.querySelector('.open-mobile-menu-btn');
const closeMenuButton = document.querySelector('.close-mobile-menu-btn');
const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
const mobileMenu = document.querySelector('.mobile-menu');

openMenuButton.addEventListener('click', () => {
  mobileMenuWrapper.classList.add('is-open');
  document.body.classList.add('not-scrollable');
});

closeMenuButton.addEventListener('click', () => {
  closeMenu();
});

mobileMenuWrapper.addEventListener('click', () => {
  closeMenu();
});

mobileMenu.addEventListener('click', e => {
  e.stopPropagation();
});

function closeMenu() {
  mobileMenuWrapper.classList.remove('is-open');
  document.body.classList.remove('not-scrollable');
}

