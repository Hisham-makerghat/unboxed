// Regenerates public/og.png (link previews) and public/apple-touch-icon.png.
// Run after changing the event details: npm run social
import { spawn } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const PORT = 4329;

// Link-preview card: render the dev-only /social-card page and screenshot it.
// Astro allows one dev server per project, so if one is already running, use that one.
const dev = spawn(`npx astro dev --port ${PORT}`, {
  shell: true,
  stdio: ['ignore', 'pipe', 'pipe'],
});
let base = `http://localhost:${PORT}`;
const onOutput = (chunk) => {
  const running = String(chunk).match(/already running[\s\S]*?URL:\s*(http\S+)/);
  if (running) base = running[1].replace(/\/$/, '');
};
dev.stdout.on('data', onOutput);
dev.stderr.on('data', onOutput);
try {
  await waitFor(() => `${base}/social-card`);
  const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(`${base}/social-card`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.card').screenshot({ path: 'public/og.png' });
  await browser.close();
  console.log('wrote public/og.png');
} finally {
  killTree(dev);
}

// Home-screen icon for iOS: the MakerGhat hand on ivory
const hand = await sharp(await readFile('src/assets/brand/hand-purple.svg'), { density: 600 })
  .resize(124, 124, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
const icon = await sharp({
  create: { width: 180, height: 180, channels: 4, background: '#F9F4E8' },
})
  .composite([{ input: hand, gravity: 'center' }])
  .png()
  .toBuffer();
await writeFile('public/apple-touch-icon.png', icon);
console.log('wrote public/apple-touch-icon.png');

async function waitFor(urlOf, tries = 120) {
  let url;
  for (let i = 0; i < tries; i++) {
    url = urlOf();
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`${url} did not come up`);
}

function killTree(child) {
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(child.pid), '/t', '/f']);
  else child.kill('SIGTERM');
}
