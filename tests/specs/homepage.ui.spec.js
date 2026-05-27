// @ts-check
const { test, expect } = require('@playwright/test');

const API = process.env.API_BASE_URL || 'http://localhost:4000';

test.describe('Homepage', () => {
  test('loads with navbar and renders recipe cards from the API', async ({ page, request }) => {
    // Make sure at least one recipe exists, so the assertion isn't a flake
    // if the DB has been wiped between runs.
    await request.post(`${API}/api/recipes`, {
      data: {
        title: 'Homepage smoke recipe',
        imgURL: 'https://loremflickr.com/600/400/food?lock=999',
        ingredients: ['anything'],
        instructions: 'Just exists so the homepage has something to render.',
        cookingTime: 1,
      },
      headers: { 'Content-Type': 'application/json' },
    });

    await page.goto('/');

    // Navbar is visible and the "Add recipe" CTA is reachable
    await expect(page.getByRole('button', { name: 'Add recipe' })).toBeVisible();

    // At least one recipe card renders
    const cards = page.locator('.recipe-details');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('clicking a recipe card navigates to its detail page', async ({ page, request }) => {
    const created = await request.post(`${API}/api/recipes`, {
      data: {
        title: 'Click-through test recipe',
        imgURL: 'https://loremflickr.com/600/400/food?lock=998',
        ingredients: ['x'],
        instructions: 'Test recipe used to verify card navigation.',
        cookingTime: 1,
      },
      headers: { 'Content-Type': 'application/json' },
    });
    const { _id } = await created.json();

    await page.goto('/');
    await page.locator(`a[href="/recipe/${_id}"]`).first().click();

    await expect(page).toHaveURL(new RegExp(`/recipe/${_id}$`));
    await expect(page.getByTestId('delete-button')).toBeVisible();

    await request.delete(`${API}/api/recipes/${_id}`);
  });
});
