const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  });

  const pages = [
    { url: 'http://127.0.0.1:3007/', name: '01-home' },
    { url: 'http://127.0.0.1:3007/games', name: '02-games-browse' },
    { url: 'http://127.0.0.1:3007/games/happy-wheels', name: '03-game-detail' },
    { url: 'http://127.0.0.1:3007/categories/puzzle', name: '04-category' },
    { url: 'http://127.0.0.1:3007/about', name: '05-about' },
  ];

  const outDir = 'C:/Users/ray41/workspace/flashvault-screenshots';
  const fs = require('fs');
  fs.mkdirSync(outDir, { recursive: true });

  for (const p of pages) {
    const page = await context.newPage();
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 15000 });
      // Wait a beat for any client-side rendering
      await page.waitForTimeout(2000);
      const outPath = path.join(outDir, `${p.name}.png`);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`OK: ${p.name} -> ${outPath}`);
    } catch (err) {
      console.error(`FAIL: ${p.name} -> ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Done.');
})();
