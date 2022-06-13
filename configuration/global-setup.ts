import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    const username = 'standard_user';
    const password = 'secret_sauce';
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();

    // Save signed-in state to 'storageState.json'.
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;