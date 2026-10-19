// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// Absolute URLs (link previews, canonical) need the public address of the site.
// Set SITE_URL once the final domain is known; on Vercel the project's production URL is used.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

// The link-preview card is a page only while developing, so it never ships
/** @type {import('astro').AstroIntegration} */
const socialCard = {
  name: 'social-card',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev')
        injectRoute({ pattern: '/social-card', entrypoint: './src/social/SocialCard.astro' });
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [socialCard],
  // Keeps the dev toolbar out of the social-card screenshot
  devToolbar: { enabled: false },
  // The brand fonts, downloaded at build time and served from the site itself
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Parkinsans',
      cssVariable: '--font-heading',
      weights: [500, 600, 700, 800],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Outfit',
      cssVariable: '--font-body',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Bungee',
      cssVariable: '--font-display',
      weights: [400],
      styles: ['normal'],
      fallbacks: ['Arial Black', 'Impact', 'sans-serif'],
    },
  ],
});
