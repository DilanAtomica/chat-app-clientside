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

test('Log in and queue up for a series, start a chat, send message and leave chat', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.getByPlaceholder('example@domain.com').click();
  await page.getByPlaceholder('example@domain.com').fill('dilan@hotmail.com');
  await page.getByLabel('*Password:').fill('123asd123asD');
  await page.getByRole('button', { name: 'Sign In' }).press('Enter');

  await expect(page).toHaveURL("http://localhost:3000/home");

  await page.getByPlaceholder('example: Game of Thrones').click();
  await page.getByPlaceholder('example: Game of Thrones').fill('game');
  await page.getByPlaceholder('example: Game of Thrones').press('Enter');

  await expect(page).toHaveURL("http://localhost:3000/search/game/1?");
  await page.getByRole('img', { name: 'Game of Thrones' }).click();

  await page.locator('#seasons').selectOption('5');
  await page.getByRole('combobox', { name: 'Choose a season: Choose an episode:' }).selectOption('3');
  await page.getByRole('button', { name: 'Find a chatter' }).click();
  await expect(page).toHaveURL("http://localhost:3000/profile");

  await page.getByRole('list').getByRole('button').nth(2).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page).toHaveURL("http://localhost:3000/login");

  //Repeat action with user 2
  await page.getByPlaceholder('example@domain.com').click();
  await page.getByPlaceholder('example@domain.com').fill('vidar@hotmail.com');
  await page.getByLabel('*Password:').fill('123asd123asD');
  await page.getByRole('button', { name: 'Sign In' }).press('Enter');

  await page.getByPlaceholder('example: Game of Thrones').click();
  await page.getByPlaceholder('example: Game of Thrones').fill('game');
  await page.getByPlaceholder('example: Game of Thrones').press('Enter');

  await expect(page).toHaveURL("http://localhost:3000/search/game/1");
  await page.getByRole('img', { name: 'Game of Thrones' }).click();

  await page.locator('#seasons').selectOption('5');
  await page.getByRole('combobox', { name: 'Choose a season: Choose an episode:' }).selectOption('3');
  await page.getByRole('button', { name: 'Find a chatter' }).click();
  await expect(page).toHaveURL("http://localhost:3000/profile");
  await page.getByRole('list').getByRole('button').nth(1).click();

  await expect(page).toHaveURL("http://localhost:3000/chat");
  await page.getByRole('button', { name: 'Game of Thrones Game of Thrones Season 5 · Episode 3 Chatting with dilan' }).click();
  await page.getByPlaceholder('Send a message...').click();
  await page.getByPlaceholder('Send a message...').fill("Hei!");
  await page.getByRole('navigation').getByRole('button').nth(3).click();
  await page.getByRole('button', { name: 'Log out' }).click();

  //Log back in with user 3 to also send message and leave chat
  await expect(page).toHaveURL("http://localhost:3000/login");
  await page.getByPlaceholder('example@domain.com').click();
  await page.getByPlaceholder('example@domain.com').fill('dilan@hotmail.com');
  await page.getByLabel('*Password:').fill('123asd123asD');
  await page.getByRole('button', { name: 'Sign In' }).press('Enter');

  //Check notification
  await expect(page).toHaveURL("http://localhost:3000/home");
  await page.getByRole('listitem').filter({ hasText: '1' }).getByRole('button').click();
  await page.getByRole('button', { name: '4 February 2023' }).click();
  await page.getByRole('button', { name: 'Go back' }).click();
  await page.locator('div').filter({ hasText: 'Notifications4 February 2023' }).nth(2).click();

  //Go to chat
  await page.getByRole('list').getByRole('button').nth(1).click();
  await expect(page).toHaveURL("http://localhost:3000/chat");
  await page.getByRole('button', { name: 'Breaking Bad Breaking Bad Season 1 · Episode 1 Chatting with dilan' }).click();
  await page.getByPlaceholder('Send a message...').click();
  await page.getByPlaceholder('Send a message...').fill('Hei på deg du!');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByRole('button', { name: 'Leave chat' }).click();

});





