import { defineConfig, devices } from '@playwright/test';

// Runs against the production build (npm test builds first).
// Locally on Windows, PW_CHANNEL=msedge uses the installed Edge instead of downloading Chromium.
const PORT = 4173;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: process.env.PW_CHANNEL || undefined,
  },
  webServer: {
    command: `npm run preview -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'laptop', use: { viewport: { width: 1366, height: 657 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'phone', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } },
    { name: 'small-phone', use: { ...devices['Pixel 7'], viewport: { width: 360, height: 640 } } },
  ],
});
