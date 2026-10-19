// Opens the unboxing intro. The starting state is decided before first paint by the
// inline script in Layout.astro; this only handles the clicks.
//   closed   → the box covers the first screen
//   breaking → the box comes apart (1.5 s), the event details fade in underneath
//   open     → intro removed

export const SEEN_KEY = 'unboxed:intro-seen';
const BREAK_MS = 1500;

const root = document.documentElement;
const content = document.getElementById('hero-content');
const title = document.getElementById('hero-title');
let timer: number | undefined;

function remember() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Private mode or blocked storage: the intro simply shows again next visit
  }
}

function finish() {
  window.clearTimeout(timer);
  root.dataset.intro = 'open';
  if (content) content.inert = false;
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
  root.dataset.intro = 'breaking';
  timer = window.setTimeout(finish, BREAK_MS);
}

function skip() {
  if (root.dataset.intro === 'open') return;
  remember();
  finish();
}

document.querySelectorAll('[data-unbox]').forEach((el) => el.addEventListener('click', unbox));
document.querySelectorAll('[data-skip]').forEach((el) => el.addEventListener('click', skip));
