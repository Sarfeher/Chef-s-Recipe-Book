// @ts-check
const { test, expect } = require('@playwright/test');
const { RecipePage } = require('../pages/RecipePage');
const { createRecipe, deleteRecipe, getRecipe } = require('../helpers/api');

test.describe('Delete recipe with confirmation modal', () => {
  test('clicking delete opens the modal — cancel closes it and keeps the recipe', async ({ page, request }) => {
    const { _id } = await createRecipe(request, { title: 'Delete cancel test' });

    const recipe = new RecipePage(page);
    await recipe.goto(_id);
    await recipe.openDeleteModal();

    await expect(recipe.modal).toBeVisible();
    await expect(recipe.modal.getByText('Delete recipe?')).toBeVisible();

    await recipe.cancelDelete();
    await expect(recipe.modal).not.toBeVisible();

    // Still on the same page
    await expect(page).toHaveURL(new RegExp(`/recipe/${_id}$`));

    // Recipe still exists in the API
    const check = await getRecipe(request, _id);
    expect(check.status()).toBe(200);

    await deleteRecipe(request, _id);
  });

  test('clicking confirm in the modal deletes the recipe and returns to homepage', async ({ page, request }) => {
    const { _id } = await createRecipe(request, { title: 'Delete confirm test' });

    const recipe = new RecipePage(page);
    await recipe.goto(_id);
    await recipe.openDeleteModal();
    await expect(recipe.modal).toBeVisible();

    await recipe.confirmDelete();

    // App navigates back to homepage after delete
    await page.waitForURL('**/');

    // API now returns 404 for the deleted id
    const check = await getRecipe(request, _id);
    expect(check.status()).toBe(404);
  });

  test('clicking the dark overlay closes the modal without deleting', async ({ page, request }) => {
    const { _id } = await createRecipe(request, { title: 'Delete overlay-dismiss test' });

    const recipe = new RecipePage(page);
    await recipe.goto(_id);
    await recipe.openDeleteModal();
    await expect(recipe.modal).toBeVisible();

    await recipe.dismissModalByOverlay();
    await expect(recipe.modal).not.toBeVisible();

    const check = await getRecipe(request, _id);
    expect(check.status()).toBe(200);

    await deleteRecipe(request, _id);
  });
});
