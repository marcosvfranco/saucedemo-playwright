import { test, expect } from '@playwright/test';

test.describe('when products page is loaded with shopping cart', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/inventory.html');
    });

    test('then a product is added to the shopping cart', async ({ page }) => {
        const firstProductBlock = await page.locator('.inventory_item:nth-child(1)');
        const firstProductData = {
            name: await firstProductBlock.locator('.inventory_item_name').textContent(),
            description: await firstProductBlock.locator('.inventory_item_desc').textContent(),
            price: await firstProductBlock.locator('.inventory_item_price').textContent()
        };

        // adding the item
        await firstProductBlock.locator('[data-test=add-to-cart-sauce-labs-backpack]').click();
        await expect(await page.locator('.shopping_cart_badge')).toHaveText('1');
        
        // going to shopping cart page
        await page.locator('.shopping_cart_link').click();
        const firstCartItem = await page.locator('.cart_item:nth-child(3)');
        const firstCartItemData = {
            quantity: await firstCartItem.locator('.cart_quantity').textContent(),
            name: await firstCartItem.locator('.inventory_item_name').textContent(),
            description: await firstCartItem.locator('.inventory_item_desc').textContent(),
            price: await firstCartItem.locator('.inventory_item_price').textContent(),
        };

        // verifying item inserted in shopping cart
        await expect(firstCartItemData.quantity).toBe('1');
        await expect(firstCartItemData.description).toBe(firstProductData.description);
        await expect(firstCartItemData.price).toBe(firstProductData.price);
        await expect(firstCartItemData.name).toBe(firstProductData.name);
    });

});
