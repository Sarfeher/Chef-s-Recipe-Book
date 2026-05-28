// @ts-check
const { test, expect } = require('../fixtures');
const path = require('path');
const { API, deleteRecipe } = require('../helpers/api');

const FIXTURE_IMAGE = path.join(__dirname, '..', 'fixtures', 'test-image.jpg');

test.describe('Image upload on the recipe form', () => {
  test('selecting a file uploads it and shows a preview', async ({ form }) => {
    await form.gotoCreate();

    await form.uploadImage(FIXTURE_IMAGE);
    const src = await form.waitForPreview();

    expect(src).toMatch(/^\/uploads\/.+\.jpg$/);
  });

  test('uploaded image is reachable and persists with the new recipe', async ({ page, form, request }) => {
    await form.gotoCreate();

    await form.uploadImage(FIXTURE_IMAGE);
    const uploadedUrl = await form.waitForPreview();

    // The image is actually served by the backend
    const imgResponse = await request.get(`${API}${uploadedUrl}`);
    expect(imgResponse.status()).toBe(200);
    expect(imgResponse.headers()['content-type']).toContain('image');

    // Fill the rest of the form and submit
    const title = `Upload test recipe ${Date.now()}`;
    await form.fill({
      title,
      ingredient: 'test ingredient',
      instructions: 'Stir and serve.',
      cookingTime: 5,
    });
    await form.submit();
    await page.waitForURL('**/');

    // The new recipe is in the API and its imgURL points at our upload
    const all = await request.get(`${API}/api/recipes`);
    const list = await all.json();
    const created = list.find((r) => r.title === title);
    expect(created).toBeTruthy();
    expect(created.imgURL).toBe(uploadedUrl);

    await deleteRecipe(request, created._id);
  });

  test('non-image files are rejected with an error message', async ({ form }) => {
    await form.gotoCreate();

    await form.uploadImage({
      name: 'not-an-image.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('hello world'),
    });

    await expect(form.uploadError).toBeVisible({ timeout: 10_000 });
    await expect(form.preview).toHaveCount(0);
  });
});
