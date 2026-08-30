const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');
const heroVideo = document.querySelector('.hero__image');
const heroVideoBreakpoint = window.matchMedia('(max-width: 760px)');

function configureHeroVideo() {
  if (!heroVideo) return;

  const mode = heroVideoBreakpoint.matches ? 'mobile' : 'desktop';
  if (heroVideo.dataset.mode === mode && heroVideo.currentSrc) {
    heroVideo.play().catch(() => {});
    return;
  }

  const sources = mode === 'mobile'
    ? [[heroVideo.dataset.mobileMp4, 'video/mp4']]
    : [
        [heroVideo.dataset.desktopWebm, 'video/webm'],
        [heroVideo.dataset.desktopMp4, 'video/mp4']
      ];

  heroVideo.pause();
  heroVideo.replaceChildren();
  sources.forEach(([src, type]) => {
    if (!src) return;
    const source = document.createElement('source');
    source.src = src;
    source.type = type;
    heroVideo.append(source);
  });

  heroVideo.dataset.mode = mode;
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.autoplay = true;
  heroVideo.loop = true;
  heroVideo.playsInline = true;
  heroVideo.load();

  const play = () => heroVideo.play().catch(() => {});
  if (heroVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) play();
  else heroVideo.addEventListener('canplay', play, { once: true });
}

configureHeroVideo();
if (heroVideoBreakpoint.addEventListener) heroVideoBreakpoint.addEventListener('change', configureHeroVideo);
else heroVideoBreakpoint.addListener(configureHeroVideo);

document.addEventListener('visibilitychange', () => {
  if (!document.hidden && heroVideo?.paused) heroVideo.play().catch(() => {});
});

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
