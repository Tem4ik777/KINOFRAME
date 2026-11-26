const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const url = pathToFileURL(path.resolve(__dirname, '../index.html')).href;

async function run(viewport, scenario) {
  const options = process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {};
  const browser = await chromium.launch(options);
  try {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await scenario(page);
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
}

test('mobile menu opens, navigates, closes and handles Escape', async () => {
  await run({ width: 390, height: 844 }, async page => {
    const button = page.locator('#burger');
    const menu = page.locator('#mainNav');
    assert.equal(await button.getAttribute('aria-expanded'), 'false');
    await button.click();
    assert.equal(await button.getAttribute('aria-expanded'), 'true');
    assert.match(await menu.getAttribute('class'), /\bopen\b/);
    if (process.env.TEST_SCREENSHOT) {
      await page.screenshot({ path: process.env.TEST_SCREENSHOT, animations: 'disabled' });
    }
    await menu.getByRole('link', { name: 'Услуги' }).click();
    assert.equal(new URL(page.url()).hash, '#services');
    assert.equal(await button.getAttribute('aria-expanded'), 'false');
    assert.doesNotMatch(await menu.getAttribute('class'), /\bopen\b/);
    await button.click();
    await page.keyboard.press('Escape');
    assert.equal(await button.getAttribute('aria-expanded'), 'false');
    assert.equal(await button.evaluate(element => document.activeElement === element), true);
  });
});

test('desktop anchor and scroll reveal work', async () => {
  await run({ width: 1280, height: 800 }, async page => {
    assert.equal(await page.locator('#burger').isVisible(), false);
    await page.locator('#mainNav').getByRole('link', { name: 'Работы' }).click();
    assert.equal(new URL(page.url()).hash, '#works');
    await page.locator('#works h2.visible').waitFor({ state: 'visible' });
  });
});
