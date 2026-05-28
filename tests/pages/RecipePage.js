// @ts-check

class RecipePage {
  constructor(page) {
    this.page = page;
    this.deleteButton = page.getByTestId('delete-button');
    this.modal = page.getByTestId('confirm-modal');
    this.cancelDeleteButton = page.getByTestId('cancel-delete');
    this.confirmDeleteButton = page.getByTestId('confirm-delete');
  }

  async goto(id) {
    await this.page.goto(`/recipe/${id}`);
  }

  async openDeleteModal() {
    await this.deleteButton.click();
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
