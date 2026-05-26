// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('GET /api/recipes', () => {
  test('returns 200 and a JSON array', async ({ request }) => {
    const response = await request.get('/api/recipes');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });
});
