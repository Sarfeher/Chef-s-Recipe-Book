// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { RecipePage } = require('../pages/RecipePage');
const { createRecipe, deleteRecipe } = require('../helpers/api');

test.describe('Homepage', () => {
  test('loads with navbar and renders recipe cards from the API', async ({ page, request }) => {
    // Make sure at least one recipe exists, so the assertion isn't a flake
    // if the DB has been wiped between runs.
    const seeded = await createRecipe(request, {
      title: 'Homepage smoke recipe',
      imgURL: 'https://loremflickr.com/600/400/food?lock=999',
      ingredients: ['anything'],
      instructions: 'Just exists so the homepage has something to render.',
    });

    const home = new HomePage(page);
    await home.goto();

    await expect(home.addRecipeButton).toBeVisible();
    await expect(home.recipeCards.first()).toBeVisible();
    expect(await home.recipeCards.count()).toBeGreaterThan(0);

    await deleteRecipe(request, seeded._id);
  });

  test('clicking a recipe card navigates to its detail page', async ({ page, request }) => {
    const { _id } = await createRecipe(request, {
      title: 'Click-through test recipe',
      imgURL: 'https://loremflickr.com/600/400/food?lock=998',
      ingredients: ['x'],
      instructions: 'Test recipe used to verify card navigation.',
    });

    const home = new HomePage(page);
    const recipe = new RecipePage(page);

    await home.goto();
    await home.openRecipe(_id);

    await expect(page).toHaveURL(new RegExp(`/recipe/${_id}$`));
    await expect(recipe.deleteButton).toBeVisible();

    await deleteRecipe(request, _id);
  });
});
