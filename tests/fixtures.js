// @ts-check
//
// Project-wide Playwright fixtures.
//
// Import `test` and `expect` from this file instead of '@playwright/test'
// in any UI spec, and the home/recipe/form Page Object instances are
// constructed automatically per test:
//
//   const { test, expect } = require('../fixtures');
//   test('something', async ({ home, recipe, form }) => { ... });
//
// The built-in `page` and `request` fixtures stay available alongside these.

const base = require('@playwright/test');
const { HomePage } = require('./pages/HomePage');
const { RecipePage } = require('./pages/RecipePage');
const { RecipeFormPage } = require('./pages/RecipeFormPage');

/**
 * @typedef {Object} PageObjectFixtures
 * @property {HomePage} home
 * @property {RecipePage} recipe
 * @property {RecipeFormPage} form
 */

/**
 * @type {import('@playwright/test').TestType<
 *   import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & PageObjectFixtures,
 *   import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions
 * >}
 */
const test = base.test.extend({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  recipe: async ({ page }, use) => {
    await use(new RecipePage(page));
  },
  form: async ({ page }, use) => {
    await use(new RecipeFormPage(page));
  },
});

module.exports = { test, expect: base.expect };
