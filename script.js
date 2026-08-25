const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');

function setMenu(open) {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('.sr-only').textContent = open ? 'Close navigation' : 'Open navigation';
  navigation.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}

menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) setMenu(false);
});
if (year) year.textContent = String(new Date().getFullYear());

