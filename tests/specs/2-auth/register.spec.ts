import { faker } from '@faker-js/faker';
import { test } from '@playwright/test';

import { url } from '@/constants/index';

test('should be able to create a new account', async ({ page }) => {
  await page.goto(url);

  await page.locator('button:has-text("Register")').click();

  const [firstName, lastName] = [faker.name.firstName(), faker.name.lastName()];
  const password = faker.internet.password();

  await page.fill('input[name=name]', firstName + ' ' + lastName);
  await page.fill('input[name=username]', `${firstName}${lastName}237`);
  await page.fill('input[name=email]', faker.internet.email(firstName, lastName));
  await page.fill('input[name=password]', password);
  await page.fill('input[name=confirmPassword]', password);

  await page.locator('data-testid=actions.auth.register').click();

  await page.locator('button:has-text("Go to App")').isVisible();
});
