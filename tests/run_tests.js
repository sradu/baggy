const puppeteer = require('puppeteer');
const fs = require('fs');

const COUPON_CODE = 'BADCODE';

// Load extension.
const extensionFiles = [
  'lib/jquery.js',
  'lib/toast.js',
  'lib/localforage.js',
  'lib/lodash.js',
  'lib/sbd.js',
  'lib/similarity.js',
  'lib/clustering.js',
  'nearest.js',
  'clientutils.js',
  'baggy.js',
];

const storesPath = `${__dirname}/stores`;
const stores = {};


const args = process.argv.slice(2);

fs.readdirSync(storesPath).filter((file) => {
  if (args[0] && file.indexOf(args[0].split('/').pop()) == -1) {
    return false;
  } 
  return file.indexOf('.json') > -1;
}).map((file) => {
stores[file.replace('.json', '')] = JSON.parse(fs.readFileSync(`${storesPath}/${file}`, 'utf8'));
});

if (Object.keys(stores).length == 0) {
  console.log('No files to test.');
  process.exit(0);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1680,
      height: 1050
    },
    args: [ '--no-sandbox', '--disable-web-security', `--window-size=1680,1050` ],
  });

  const page = await browser.newPage();

  await page.setBypassCSP(true);

  // page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  for (const store in stores) {
    const savedCoords = stores[store];

    await page.setViewport({
      width: savedCoords.viewport.w,
      height: 1050,
    });

    await page.goto(`file://${storesPath}/${store}.html`, { waitUntil: 'load' });

    for (const extensionFile of extensionFiles) {
      await page.evaluate(fs.readFileSync(`${__dirname}/../src/${extensionFile}`, 'utf8'));
    }

    await page.evaluate(() => {
      window.baggy = new Baggy({ disableShadowDOM: true });
      window.baggy.start();
    });

    await page.waitForSelector('#baggy_container', { timeout: 10000 });

    await page.focus('#baggy_input');
    await page.keyboard.type(COUPON_CODE);
    await page.click('#baggy_test_mode');
    await page.click('#baggy_button');

    await page.waitForFunction(() => 'baggyCoords' in window);

    const baggyCoords = JSON.parse(await page.evaluate(() => JSON.stringify(window.baggyCoords)));

    let isOK = true;
    for (const coordType in baggyCoords) {
      if (Math.abs(baggyCoords[coordType].x - savedCoords[coordType].x) > 5 ||
          Math.abs(baggyCoords[coordType].y != savedCoords[coordType].y) > 5) {
        isOK = false;
        console.log(`${coordType} coords are different.`, baggyCoords[coordType], savedCoords[coordType]);
      }
    }

    console.log(`${store}: ${isOK ? 'OK' : 'NOT OK'}`);
  }

  //await browser.close();
})();