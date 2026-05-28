// @ts-check
//
// Negative-path tests for RecipeForm validation.
//
// The backend rejects POST /api/recipes with 400 + emptyFields when required
// fields are missing. The frontend reads emptyFields and applies a .error CSS
// class to each input it names, and renders the error message under the form.
//
// Quirk: the backend's check is `if (!ingredients)`, which is FALSE for the
// frontend's initial state `[]` (empty arrays are truthy). So submitting a
// fully empty form flags title/instructions/cookingTime but NOT ingredients.
// The tests assert the actual observed behavior — see bug #5 in the project
// notes if/when this gets fixed.

const { test, expect } = require('@playwright/test');
const { RecipeFormPage } = require('../pages/RecipeFormPage');
const { API, deleteRecipe } = require('../helpers/api');

test.describe('RecipeForm validation', () => {
  test('submitting an empty form shows the error message and flags required fields', async ({ page }) => {
    const form = new RecipeFormPage(page);
    await form.gotoCreate();

    await form.submit();

    await expect(form.errorMessage).toHaveText('Please fill in all fields');
    await expect(page).toHaveURL(/\/create$/);

    expect(await form.fieldHasError('title')).toBe(true);
    expect(await form.fieldHasError('instructions')).toBe(true);
    expect(await form.fieldHasError('cookingTime')).toBe(true);
  });

  test('only the still-empty fields get the error class after a partial fill', async ({ page }) => {
    const form = new RecipeFormPage(page);
    await form.gotoCreate();

    await form.fill({ title: 'Partly filled recipe' });
    await form.submit();

    await expect(form.errorMessage).toBeVisible();
    expect(await form.fieldHasError('title')).toBe(false);
    expect(await form.fieldHasError('instructions')).toBe(true);
    expect(await form.fieldHasError('cookingTime')).toBe(true);
  });

  test('errors clear and the recipe saves once all required fields are valid', async ({ page, request }) => {
    const form = new RecipeFormPage(page);
    await form.gotoCreate();

    await form.submit();
    await expect(form.errorMessage).toBeVisible();

    const title = `Validation recovery ${Date.now()}`;
    await form.fill({
      title,
      ingredient: 'salt',
      instructions: 'Stir well.',
      cookingTime: 5,
    });
    await form.submit();

    await expect(page).toHaveURL('http://localhost:3000/');

    const listResponse = await request.get(`${API}/api/recipes`);
    const recipes = await listResponse.json();
    const created = recipes.find((r) => r.title === title);
    expect(created).toBeTruthy();

    await deleteRecipe(request, created._id);
  });
});
