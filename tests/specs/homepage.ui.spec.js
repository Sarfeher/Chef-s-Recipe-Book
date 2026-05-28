// @ts-check
const { test, expect } = require('../fixtures');
const { createRecipe, deleteRecipe } = require('../helpers/api');

test.describe('Homepage', () => {
  test('loads with navbar and renders recipe cards from the API', async ({ home, request }) => {
    // Make sure at least one recipe exists, so the assertion isn't a flake
    // if the DB has been wiped between runs.
    const seeded = await createRecipe(request, {
      title: 'Homepage smoke recipe',
      imgURL: 'https://loremflickr.com/600/400/food?lock=999',
      ingredients: ['anything'],
      instructions: 'Just exists so the homepage has something to render.',
    });

    await home.goto();

    await expect(home.addRecipeButton).toBeVisible();
    await expect(home.recipeCards.first()).toBeVisible();
    expect(await home.recipeCards.count()).toBeGreaterThan(0);

    await deleteRecipe(request, seeded._id);
  });

  test('shows the empty-state message when no recipes exist', async ({ page, home }) => {
    // Stub the recipes endpoint with an empty list instead of wiping the real
    // DB — that would race with the other tests running in parallel.
    await page.route('**/api/recipes', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
      } else {
        await route.continue();
      }
    });

    await home.goto();

    await expect(home.emptyState).toBeVisible();
    await expect(home.emptyState).toHaveText(/No recipes yet/);
    await expect(home.recipeCards).toHaveCount(0);
    await expect(home.addRecipeButton).toBeVisible();
  });

  test('clicking a recipe card navigates to its detail page', async ({ page, home, recipe, request }) => {
    const { _id } = await createRecipe(request, {
      title: 'Click-through test recipe',
      imgURL: 'https://loremflickr.com/600/400/food?lock=998',
      ingredients: ['x'],
      instructions: 'Test recipe used to verify card navigation.',
    });

    await home.goto();
    await home.openRecipe(_id);

    await expect(page).toHaveURL(new RegExp(`/recipe/${_id}$`));
    await expect(recipe.deleteButton).toBeVisible();

    await deleteRecipe(request, _id);
  });
});
