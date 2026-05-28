// @ts-check

const API = process.env.API_BASE_URL || 'http://localhost:4000';

const defaults = {
  title: 'Test recipe',
  imgURL: 'https://loremflickr.com/600/400/food?lock=42',
  ingredients: ['test'],
  instructions: 'Created by an automated UI test.',
  cookingTime: 1,
};

async function createRecipe(request, overrides = {}) {
  const response = await request.post(`${API}/api/recipes`, {
    data: { ...defaults, ...overrides },
    headers: { 'Content-Type': 'application/json' },
  });
  const body = await response.json();
  return body;
}

async function deleteRecipe(request, id) {
  return request.delete(`${API}/api/recipes/${id}`);
}

async function getRecipe(request, id) {
  return request.get(`${API}/api/recipes/${id}`);
}

module.exports = { createRecipe, deleteRecipe, getRecipe, API };
