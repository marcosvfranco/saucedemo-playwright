import { test, expect } from '@playwright/test';

test.describe('when products page is loaded', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/inventory.html');
    })

    test('then the products are displayed with their respective prices', async ({ page }) => {
        await expect(await page.url()).toEqual('https://www.saucedemo.com/inventory.html');
        await expect(await page.locator('.header_secondary_container > span').textContent()).toEqual('Products');

        const productNames = await page.locator('.inventory_item_name').allTextContents();
        const productPricesRaw = await page.locator('.inventory_item_price').allTextContents();

        await expect(productPricesRaw).toHaveLength(6);
        await expect(productNames).toHaveLength(6);
    })

    test('then each product needs to have a price higher than 0', async ({ page }) => {
        const productPricesRaw = await page.locator('.inventory_item_price').allTextContents();
        productPricesRaw.forEach(async (item) => {
            const price = parseFloat(item.slice(1));
            await expect(price).toBeGreaterThan(0);
        })
    })

    test('then each product needs to have name started with Sauce Labs', async ({ page }) => {
        const productNames = await page.locator('.inventory_item_name').allTextContents();
        productNames.forEach(async (item) => {
            await expect(item.slice(0, 10)).toEqual('Sauce Labs');
        })
        test.fail();
    })

})
