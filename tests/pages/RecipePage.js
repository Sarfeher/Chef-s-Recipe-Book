// @ts-check
/** @typedef {import('@playwright/test').Page} Page */

class RecipePage {
  /** @param {Page} page */
  constructor(page) {
    this.page = page;
    this.deleteButton = page.getByTestId('delete-button');
    this.updateButton = page.getByTestId('update-button');
    this.backButton = page.getByTestId('back-button');
    this.modal = page.getByTestId('confirm-modal');
    this.cancelDeleteButton = page.getByTestId('cancel-delete');
    this.confirmDeleteButton = page.getByTestId('confirm-delete');
    this.detailsContainer = page.locator('.recipe-details-long');
    this.title = this.detailsContainer.locator('h4');
    this.ingredientItems = this.detailsContainer.locator('ul li');
  }

  /** @param {string} id */
  async goto(id) {
    await this.page.goto(`/recipe/${id}`);
  }

  async openDeleteModal() {
    await this.deleteButton.click();
  }

  async openUpdate() {
    await this.updateButton.click();
  }

  async goBack() {
    await this.backButton.click();
  }

  async cancelDelete() {
    await this.cancelDeleteButton.click();
  }

  async confirmDelete() {
    await this.confirmDeleteButton.click();
  }

  async dismissModalByOverlay() {
    // Click the dark overlay area, well outside the modal box
    await this.modal.click({ position: { x: 5, y: 5 } });
  }
}

module.exports = { RecipePage };
