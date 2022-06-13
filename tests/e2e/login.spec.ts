import { test, expect } from '@playwright/test';

test.describe('when open a page with basic auth', async () => {

    const username = 'standard_user';
    const password = 'secret_sauce';

    test.beforeEach(async ({ page }) => {
        await page.goto('');
    })

    test('then the page should be displayed after the authentication', async ({ page }) => {
        await page.locator('#user-name').fill(username);
        await page.locator('#password').fill(password);
        await page.locator('#login-button').click();

        await expect(await page.url()).toEqual('https://www.saucedemo.com/inventory.html');
        await expect(await page.locator('.header_secondary_container > span').textContent()).toEqual('Products');
    })
})
