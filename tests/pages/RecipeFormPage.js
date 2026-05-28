// @ts-check

class RecipeFormPage {
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
  }

  async gotoCreate() {
    await this.page.goto('/create');
  }

  async uploadImage(filePathOrPayload) {
    await this.imageUpload.setInputFiles(filePathOrPayload);
  }

  async waitForPreview(timeout = 10_000) {
    await this.preview.waitFor({ state: 'visible', timeout });
    return this.preview.getAttribute('src');
  }

  async fill({ title, ingredient, instructions, cookingTime }) {
    if (title !== undefined) await this.titleInput.fill(title);
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
