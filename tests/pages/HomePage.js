// @ts-check

class HomePage {
  constructor(page) {
    this.page = page;
    this.addRecipeButton = page.getByRole('button', { name: 'Add recipe' });
    this.recipeCards = page.locator('.recipe-details');
  }

  async goto() {
    await this.page.goto('/');
  }

  recipeLink(id) {
    return this.page.locator(`a[href="/recipe/${id}"]`).first();
  }

  async openRecipe(id) {
    await this.recipeLink(id).click();
  }
}

module.exports = { HomePage };
