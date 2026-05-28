// @ts-check
/** @typedef {import('@playwright/test').Page} Page */
/** @typedef {Parameters<import('@playwright/test').Locator['setInputFiles']>[0]} InputFiles */

/**
 * @typedef {Object} RecipeFormFields
 * @property {string} [title]
 * @property {string} [pictureUrl]
 * @property {string} [ingredient]
 * @property {string} [instructions]
 * @property {string|number} [cookingTime]
 */

class RecipeFormPage {
  /** @param {Page} page */
  constructor(page) {
    this.page = page;
    this.titleInput = page.getByTestId('recipe-title-input');
    this.pictureUrlInput = page.getByTestId('picture-url-input');
    this.imageUpload = page.getByTestId('image-upload');
    this.ingredientInput = page.getByTestId('ingredient-input');
    this.addIngredientButton = page.getByTestId('add-ingredient-button');
    this.instructionsInput = page.getByTestId('instructions-input');
    this.cookingTimeInput = page.getByTestId('cooking-time-input');
    this.saveButton = page.getByTestId('save-recipe-button');
    this.preview = page.locator('.image-preview img');
    this.uploadError = page.locator('.upload-error');
    this.errorMessage = page.locator('form.create > div.error');
  }

  /** @param {'title'|'ingredients'|'instructions'|'cookingTime'} field */
  fieldHasError(field) {
    const testIdByField = {
      title: 'recipe-title-input',
      ingredients: 'ingredient-input',
      instructions: 'instructions-input',
      cookingTime: 'cooking-time-input',
    };
    return this.page.getByTestId(testIdByField[field]).evaluate(
      (el) => el.classList.contains('error'),
    );
  }

  async gotoCreate() {
    await this.page.goto('/create');
  }

  /** @param {string} id */
  async gotoUpdate(id) {
    await this.page.goto(`/update/${id}`);
  }

  /** @param {InputFiles} filePathOrPayload */
  async uploadImage(filePathOrPayload) {
    await this.imageUpload.setInputFiles(filePathOrPayload);
  }

  async waitForPreview(timeout = 10_000) {
    await this.preview.waitFor({ state: 'visible', timeout });
    return this.preview.getAttribute('src');
  }

  /** @param {RecipeFormFields} fields */
  async fill({ title, pictureUrl, ingredient, instructions, cookingTime }) {
    if (title !== undefined) await this.titleInput.fill(title);
    if (pictureUrl !== undefined) await this.pictureUrlInput.fill(pictureUrl);
    if (ingredient !== undefined) {
      await this.ingredientInput.fill(ingredient);
      await this.addIngredientButton.click();
    }
    if (instructions !== undefined) await this.instructionsInput.fill(instructions);
    if (cookingTime !== undefined) await this.cookingTimeInput.fill(String(cookingTime));
  }

  async submit() {
    await this.saveButton.click();
  }
}

module.exports = { RecipeFormPage };
