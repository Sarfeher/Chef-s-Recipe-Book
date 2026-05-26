// @ts-check
const { test, expect } = require('@playwright/test');

// `serial` = these tests run in order, and if one fails the rest are skipped.
// We do this because each step depends on the previous one (the same recipe).
test.describe.serial('Recipe CRUD flow', () => {
  // Shared state across the four steps. The POST step sets it, the others use it.
  let createdId;

  const newRecipe = {
    title: 'CRUD Test Pizza',
    ingredients: 'flour, tomato, mozzarella, basil',
    instructions: 'Stretch, top, bake at 500F for 7 minutes.',
    cookingTime: 15,
    imgURL: 'https://example.com/pizza.jpg',
  };

  test('CREATE — POST returns the new recipe with an _id', async ({ request }) => {
    const response = await request.post('/api/recipes', { data: newRecipe });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      title: newRecipe.title,
      instructions: newRecipe.instructions,
      cookingTime: newRecipe.cookingTime,
    });
    expect(body._id).toBeTruthy();        // Mongo gives us an id
    expect(body.createdAt).toBeTruthy();  // Mongoose timestamps

    createdId = body._id; // save for the next steps
  });

  test('READ — GET by id returns the same recipe', async ({ request }) => {
    const response = await request.get(`/api/recipes/${createdId}`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body._id).toBe(createdId);
    expect(body.title).toBe(newRecipe.title);
  });

  test('UPDATE — PATCH changes only the fields we send', async ({ request }) => {
    const response = await request.patch(`/api/recipes/${createdId}`, {
      data: { title: 'Updated Pizza Title', cookingTime: 25 },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toBe('Updated Pizza Title');
    expect(body.cookingTime).toBe(25);
    // Untouched field should be unchanged:
    expect(body.instructions).toBe(newRecipe.instructions);
  });

  test('DELETE — recipe is removed and GET returns 404', async ({ request }) => {
    const deleteResponse = await request.delete(`/api/recipes/${createdId}`);
    expect(deleteResponse.status()).toBe(200);

    // Verify it's actually gone:
    const getResponse = await request.get(`/api/recipes/${createdId}`);
    expect(getResponse.status()).toBe(404);
  });
});
