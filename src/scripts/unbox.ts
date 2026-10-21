// Opens the unboxing intro. The starting state is decided before first paint by the
// inline script in Layout.astro; this only handles the box.
//   closed   → the box is the whole landing page: no scrolling, nothing else reachable
//   breaking → the box comes apart (1.5 s), the event details fade in underneath
//   open     → intro removed, the page scrolls normally

export const SEEN_KEY = 'unboxed:intro-seen';
const BREAK_MS = 1500;

const root = document.documentElement;
const content = document.getElementById('hero-content');
const title = document.getElementById('hero-title');
// Everything after the first screen
const behind = [...document.querySelectorAll<HTMLElement>('main > *, body footer')].filter(
  (el) => !el.contains(content),
);
let timer: number | undefined;

function remember() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Private mode or blocked storage: the intro simply shows again next visit
  }
}

function setBehindInert(inert: boolean) {
  behind.forEach((el) => (el.inert = inert));
}

function finish() {
  window.clearTimeout(timer);
  root.dataset.intro = 'open';
  if (content) content.inert = false;
  setBehindInert(false);
  // Put keyboard and screen-reader users on the headline the box revealed
  title?.focus({ preventScroll: true });
}

function unbox() {
  if (root.dataset.intro !== 'closed') return;
  remember();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish();
    return;
  }
  // Tells the hero art to wait for the box before things fly out of it
  root.dataset.unboxed = '';
  root.dataset.intro = 'breaking';
  timer = window.setTimeout(finish, BREAK_MS);
}

if (root.dataset.intro === 'closed') {
  // The box is the landing page: start at the top, keep the rest out of reach until it opens
  window.scrollTo(0, 0);
  setBehindInert(true);
}

document.querySelectorAll('[data-unbox]').forEach((el) => el.addEventListener('click', unbox));
