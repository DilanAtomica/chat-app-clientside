import { test, expect } from '@playwright/test';

test('Log in and queue up for a series and then delete it', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.getByPlaceholder('example@domain.com').click();
  await page.getByPlaceholder('example@domain.com').fill('dilan@hotmail.com');
  await page.getByLabel('*Password:').fill('123asd123asD');
  await page.getByRole('button', { name: 'Sign In' }).press('Enter');

  await expect(page).toHaveURL(/.*home/);

  await page.getByPlaceholder('example: Game of Thrones').click();
  await page.getByPlaceholder('example: Game of Thrones').fill('game');
  await page.getByPlaceholder('example: Game of Thrones').press('Enter');

  await expect(page).toHaveURL("http://localhost:3000/search/game/1?");

  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page).toHaveURL("http://localhost:3000/search/game/2");
  await page.getByRole('button', { name: '5' }).click();
  await expect(page).toHaveURL("http://localhost:3000/search/game/5");
  await page.getByRole('button', { name: 'Prev' }).click();
  await expect(page).toHaveURL("http://localhost:3000/search/game/4");
  await page.getByRole('button', { name: 'Prev' }).click();
  await expect(page).toHaveURL("http://localhost:3000/search/game/3");
  await page.getByRole('button', { name: '1' }).click();
  await expect(page).toHaveURL("http://localhost:3000/search/game/1");
  await page.getByRole('img', { name: 'Game of Thrones' }).click();

  await page.locator('#seasons').selectOption('5');
  await page.getByRole('combobox', { name: 'Choose a season: Choose an episode:' }).selectOption('3');
  await page.getByRole('button', { name: 'Find a chatter' }).click();

  await expect(page).toHaveURL("http://localhost:3000/profile");
  await page.getByRole('listitem').filter({ hasText: 'Game of ThronesSeason 5Episode 3' }).getByRole('button').click();


});


