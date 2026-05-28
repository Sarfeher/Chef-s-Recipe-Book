// @ts-check
/** @typedef {import('@playwright/test').Page} Page */

class HomePage {
  /** @param {Page} page */
  constructor(page) {
    this.page = page;
    this.addRecipeButton = page.getByRole('button', { name: 'Add recipe' });
    this.recipeCards = page.locator('.recipe-details');
    this.emptyState = page.getByTestId('empty-state');
  }

  async goto() {
    await this.page.goto('/');
  }

  /** @param {string} id */
  recipeLink(id) {
    return this.page.locator(`a[href="/recipe/${id}"]`).first();
  }

  /** @param {string} id */
  async openRecipe(id) {
    await this.recipeLink(id).click();
  }

  async clickAddRecipe() {
    await this.addRecipeButton.click();
  }

  /** @param {string} title */
  cardByTitle(title) {
    return this.recipeCards.filter({
      has: this.page.getByRole('heading', { name: title, exact: true }),
    }).first();
  }

  /** @param {string} title */
  async openRecipeByTitle(title) {
    await this.cardByTitle(title).click();
  }
}

module.exports = { HomePage };
