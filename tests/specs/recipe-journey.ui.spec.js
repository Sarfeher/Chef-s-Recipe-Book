// @ts-check
//
// End-to-end recipe lifecycle through the UI: create → view → edit → delete.
//
// Run it visibly:
//   SLOWMO=400 npx playwright test specs/recipe-journey.ui.spec.js --headed --workers=1
//
// Run it normally (fast, headless — what CI does):
//   npx playwright test specs/recipe-journey.ui.spec.js

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { RecipePage } = require('../pages/RecipePage');
const { RecipeFormPage } = require('../pages/RecipeFormPage');

test.describe('Recipe lifecycle through the UI', () => {
  test('create, view, edit, then delete a recipe', async ({ page }) => {
    const stamp = Date.now();
    const originalTitle = `Journey recipe ${stamp}`;
    const updatedTitle = `Journey recipe ${stamp} (edited)`;
    const ingredient = 'olive oil';
    const instructions = 'Mix everything, then serve warm.';
    const cookingTime = 12;
    const updatedCookingTime = 25;
    const pictureUrl = `https://loremflickr.com/600/400/food?lock=${stamp}`;

    const home = new HomePage(page);
    const recipe = new RecipePage(page);
    const form = new RecipeFormPage(page);

    // 1. Start on the homepage and open the create form
    await home.goto();
    await home.clickAddRecipe();
    await expect(page).toHaveURL(/\/create$/);

    // 2. Fill in the new recipe and submit
    await form.fill({
      title: originalTitle,
      pictureUrl,
      ingredient,
      instructions,
      cookingTime,
    });
    await form.submit();

    // 3. Back on the homepage, the new card is visible
    await page.waitForURL('**/');
    await expect(home.cardByTitle(originalTitle)).toBeVisible();

    // 4. Open the recipe — its detail page shows everything we entered
    await home.openRecipeByTitle(originalTitle);
    await expect(page).toHaveURL(/\/recipe\/[a-f0-9]+$/);
    const createdUrl = page.url();
    const createdId = createdUrl.split('/').pop();

    await expect(recipe.title).toHaveText(originalTitle);
    await expect(recipe.ingredientItems).toContainText([ingredient]);
    await expect(page.getByText(instructions)).toBeVisible();
    await expect(page.getByText(`Cooking Time: ${cookingTime}`)).toBeVisible();

    // 5. Click update — form is prefilled with our values
    await recipe.openUpdate();
    await expect(page).toHaveURL(new RegExp(`/update/${createdId}$`));
    await expect(form.titleInput).toHaveValue(originalTitle);
    await expect(form.instructionsInput).toHaveValue(instructions);
    await expect(form.cookingTimeInput).toHaveValue(String(cookingTime));

    // 6. Change the title and cooking time, then submit the edit
    await form.titleInput.fill(updatedTitle);
    await form.cookingTimeInput.fill(String(updatedCookingTime));
    await form.submit();
    await page.waitForURL('**/');

    // 7. Old title gone, new title present on the homepage
    await expect(home.cardByTitle(originalTitle)).toHaveCount(0);
    await expect(home.cardByTitle(updatedTitle)).toBeVisible();

    // 8. Open the edited recipe — new values are displayed
    await home.openRecipeByTitle(updatedTitle);
    await expect(recipe.title).toHaveText(updatedTitle);
    await expect(page.getByText(`Cooking Time: ${updatedCookingTime}`)).toBeVisible();

    // 9. Delete it via the confirmation modal
    await recipe.openDeleteModal();
    await expect(recipe.modal).toBeVisible();
    await recipe.confirmDelete();

    // 10. Back on the homepage, the recipe is gone
    await page.waitForURL('**/');
    await expect(home.cardByTitle(updatedTitle)).toHaveCount(0);
  });
});
