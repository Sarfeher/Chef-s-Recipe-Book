// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000';
const UI_BASE_URL = process.env.UI_BASE_URL || 'http://localhost:3000';

module.exports = defineConfig({
  testDir: './specs',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],

  projects: [
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.js/,
      use: {
        baseURL: API_BASE_URL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      },
    },
    {
      name: 'ui',
      testMatch: /.*\.ui\.spec\.js/,
      use: {
        baseURL: UI_BASE_URL,
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
