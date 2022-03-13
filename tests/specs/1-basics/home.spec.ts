import { expect, test } from '@playwright/test';

import { url } from '@/constants/index';

test('should navigate to homepage, test by h1', async ({ page }) => {
  await page.goto(url);

  const title = page.locator('h1');

  await expect(title).toHaveText('Reactive Resume');
});

test('should navigate to homepage, but in another language', async ({ page }) => {
  await page.goto(url + '/ta');

  const title = page.locator('h1');

  await expect(title).toHaveText('ரியாக்டிவ் ரெசுமே');
});

test('should display app version on the homepage', async ({ page }) => {
  await page.goto(url);

  const semVerRegex = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?/;
  const appVersion = await page.locator('data-testid=app.version').innerText();

  expect(appVersion).toMatch(semVerRegex);
});
