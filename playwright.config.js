const { defineConfig } = require('@playwright/test');

const baseDir = __dirname.replace(/\\/g, '/');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    baseURL: `file:///${baseDir}`,
    screenshot: 'on',
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['html', { open: 'never' }]],
});
