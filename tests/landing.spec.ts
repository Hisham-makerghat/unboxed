import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { links } from '../src/content/site';

const introState = (page: Page) => page.locator('html').getAttribute('data-intro');

async function noSidewaysScroll(page: Page) {
  const { scroll, client } = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(scroll).toBeLessThanOrEqual(client);
}

test.describe('unboxing intro', () => {
  test('covers exactly the first screen on a first visit', async ({ page }) => {
    await page.goto('/');
    expect(await introState(page)).toBe('closed');
    const viewport = page.viewportSize()!;

    const hero = await page.locator('.hero').boundingBox();
    expect(Math.round(hero!.height)).toBe(viewport.height);

    // Logos, box, buttons and the date line all fit on the screen
    for (const selector of [
      '.intro .lockup',
      '.scene',
      '.intro__open',
      '.intro__skip',
      '.intro__facts',
    ]) {
      const box = await page.locator(selector).boundingBox();
      expect(box, selector).not.toBeNull();
      expect(box!.y, `${selector} top`).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height, `${selector} bottom`).toBeLessThanOrEqual(viewport.height + 1);
    }

    // The details underneath are out of the keyboard order until the box opens
    expect(await page.locator('#hero-content').evaluate((el) => (el as HTMLElement).inert)).toBe(
      true,
    );
    await noSidewaysScroll(page);
  });

  test('opening the box reveals the event details and focuses the headline', async ({ page }) => {
    await page.goto('/');
    await page.locator('.intro__open').click();
    expect(await introState(page)).toBe('breaking');
    await expect(page.locator('html')).toHaveAttribute('data-intro', 'open', { timeout: 3000 });
    await expect(page.locator('#intro')).toBeHidden();
    await expect(page.locator('#hero-title')).toBeFocused();
    await expect(page.locator('.hero__register')).toBeVisible();
    expect(await page.locator('#hero-content').evaluate((el) => (el as HTMLElement).inert)).toBe(
      false,
    );
  });

  test('clicking the box itself opens it too', async ({ page }) => {
    await page.goto('/');
    await page.locator('.scene').click();
    await expect(page.locator('html')).toHaveAttribute('data-intro', 'open', { timeout: 3000 });
  });

  test('skip goes straight to the details', async ({ page }) => {
    await page.goto('/');
    await page.locator('.intro__skip').click();
    expect(await introState(page)).toBe('open');
    await expect(page.locator('#hero-title')).toBeFocused();
  });

  test('shows once per visit', async ({ page }) => {
    await page.goto('/');
    await page.locator('.intro__skip').click();
    await page.reload();
    expect(await introState(page)).toBe('open');
    await expect(page.locator('#intro')).toBeHidden();
  });

  test('is skipped for people who ask for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    expect(await introState(page)).toBe('open');
  });

  test('links can skip or force it', async ({ page }) => {
    await page.goto('/?intro=skip');
    expect(await introState(page)).toBe('open');
    await page.goto('/#journey');
    expect(await introState(page)).toBe('open');
    await page.goto('/?intro=show');
    expect(await introState(page)).toBe('closed');
  });
});

test.describe('page', () => {
  test('has no sideways scrolling once open', async ({ page }) => {
    await page.goto('/?intro=skip');
    await noSidewaysScroll(page);
  });

  test('every Register button goes to the registration link', async ({ page }) => {
    await page.goto('/?intro=skip');
    const hrefs = await page
      .locator('[data-track]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    expect(hrefs.length).toBe(3);
    for (const href of hrefs) expect(href).toBe(links.register);
  });

  test('shows the details without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('#intro')).toBeHidden();
    await expect(page.locator('#hero-title')).toBeVisible();
    await context.close();
  });

  test('has a link preview and event data for search engines', async ({ page, request }) => {
    await page.goto('/?intro=skip');
    const og = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(og).toMatch(/^https?:\/\/.+\/og\.png$/);
    expect((await request.get('/og.png')).ok()).toBe(true);

    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(json!);
    expect(data['@type']).toBe('Event');
    expect(data.startDate).toBe('2026-12-12T09:00:00+05:30');
  });
});

test.describe('accessibility', () => {
  test('the intro has no WCAG A/AA violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .include('#intro')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('the page has no WCAG A/AA violations', async ({ page }) => {
    await page.goto('/?intro=skip');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
