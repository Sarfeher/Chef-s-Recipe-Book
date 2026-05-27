// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const API = process.env.API_BASE_URL || 'http://localhost:4000';
const FIXTURE_IMAGE = path.join(__dirname, '..', 'fixtures', 'test-image.jpg');

test.describe('Image upload on the recipe form', () => {
  test('selecting a file uploads it and shows a preview', async ({ page }) => {
    await page.goto('/create');

    await page.getByTestId('image-upload').setInputFiles(FIXTURE_IMAGE);

    // Preview image becomes visible once the upload finishes
    const preview = page.locator('.image-preview img');
    await expect(preview).toBeVisible({ timeout: 10_000 });

    // Preview src points at our backend's /uploads path
    const src = await preview.getAttribute('src');
    expect(src).toMatch(/^\/uploads\/.+\.jpg$/);
  });

  test('uploaded image is reachable and persists with the new recipe', async ({ page, request }) => {
    await page.goto('/create');

    await page.getByTestId('image-upload').setInputFiles(FIXTURE_IMAGE);
    const preview = page.locator('.image-preview img');
    await expect(preview).toBeVisible({ timeout: 10_000 });
    const uploadedUrl = await preview.getAttribute('src');

    // The image is actually served by the backend
    const imgResponse = await request.get(`${API}${uploadedUrl}`);
    expect(imgResponse.status()).toBe(200);
    expect(imgResponse.headers()['content-type']).toContain('image');

    // Fill the rest of the form and submit
    const title = `Upload test recipe ${Date.now()}`;
    await page.locator('input').nth(0).fill(title);          // title
    // skip Picture URL (it's already populated by the upload)
    await page.locator('input').nth(3).fill('test ingredient'); // ingredient
    await page.getByRole('button', { name: 'Add Ingredient' }).click();
    await page.locator('input').nth(4).fill('Stir and serve.'); // instructions
    await page.locator('input[type="number"]').fill('5');       // cooking time

    await page.getByRole('button', { name: 'Save Recipe' }).click();
    await page.waitForURL('**/');

    // The new recipe is in the API and its imgURL points at our upload
    const all = await request.get(`${API}/api/recipes`);
    const list = await all.json();
    const created = list.find((r) => r.title === title);
    expect(created).toBeTruthy();
    expect(created.imgURL).toBe(uploadedUrl);

    await request.delete(`${API}/api/recipes/${created._id}`);
  });

  test('non-image files are rejected with an error message', async ({ page }) => {
    await page.goto('/create');

    // Create an in-memory text file and try to upload it
    await page.getByTestId('image-upload').setInputFiles({
      name: 'not-an-image.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('hello world'),
    });

    await expect(page.locator('.upload-error')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('.image-preview img')).toHaveCount(0);
  });
});
