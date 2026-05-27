// @ts-check
const { test, expect } = require('@playwright/test');

const API = process.env.API_BASE_URL || 'http://localhost:4000';

async function createRecipe(request, title) {
  const response = await request.post(`${API}/api/recipes`, {
    data: {
      title,
      imgURL: 'https://loremflickr.com/600/400/food?lock=42',
      ingredients: ['test'],
      instructions: 'Created by an automated UI test.',
      cookingTime: 1,
    },
    headers: { 'Content-Type': 'application/json' },
  });
  const body = await response.json();
  return body._id;
}

test.describe('Delete recipe with confirmation modal', () => {
  test('clicking delete opens the modal — cancel closes it and keeps the recipe', async ({ page, request }) => {
    const id = await createRecipe(request, 'Delete cancel test');

    await page.goto(`/recipe/${id}`);
    await page.getByTestId('delete-button').click();

    const modal = page.getByTestId('confirm-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('Delete recipe?')).toBeVisible();

    await page.getByTestId('cancel-delete').click();
    await expect(modal).not.toBeVisible();

    // Still on the same page
    await expect(page).toHaveURL(new RegExp(`/recipe/${id}$`));

    // Recipe still exists in the API
    const check = await request.get(`${API}/api/recipes/${id}`);
    expect(check.status()).toBe(200);

    await request.delete(`${API}/api/recipes/${id}`);
  });

  test('clicking confirm in the modal deletes the recipe and returns to homepage', async ({ page, request }) => {
    const id = await createRecipe(request, 'Delete confirm test');

    await page.goto(`/recipe/${id}`);
    await page.getByTestId('delete-button').click();
    await expect(page.getByTestId('confirm-modal')).toBeVisible();

    await page.getByTestId('confirm-delete').click();

    // App navigates back to homepage after delete
    await page.waitForURL('**/');

    // API now returns 404 for the deleted id
    const check = await request.get(`${API}/api/recipes/${id}`);
    expect(check.status()).toBe(404);
  });

  test('clicking the dark overlay closes the modal without deleting', async ({ page, request }) => {
    const id = await createRecipe(request, 'Delete overlay-dismiss test');

    await page.goto(`/recipe/${id}`);
    await page.getByTestId('delete-button').click();

    const modal = page.getByTestId('confirm-modal');
    await expect(modal).toBeVisible();

    // Click the dark overlay area, well outside the modal box
    await modal.click({ position: { x: 5, y: 5 } });
    await expect(modal).not.toBeVisible();

    const check = await request.get(`${API}/api/recipes/${id}`);
    expect(check.status()).toBe(200);

    await request.delete(`${API}/api/recipes/${id}`);
  });
});
