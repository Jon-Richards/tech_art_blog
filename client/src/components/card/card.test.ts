// eslint-disable-next-line
const puppeteer = require('puppeteer');

let browser = puppeteer.Browser;
let page = puppeteer.Page;

const sleep = async (ms: number) =>
  await new Promise((res) => setTimeout(res, ms));

describe('The Card component.', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    await page.goto('http://192.168.33.10:8000/style-guide/components');
  });

  it('Is defined.', async () => {
    // await sleep(1_000);
    const card = await page.$('jr-card');
    expect(card).toBeDefined();
    expect(card).not.toBeNull();
  }, 3_000);

  it('Displays the proper description.', async () => {
    // await sleep(1_000);
    const desc = await page.evaluate(() => document.querySelector('jr-card')
        ?.shadowRoot
        ?.querySelector('[data-test-hook="description"]')
        ?.textContent
        ?.trim());

    expect(desc).toEqual('This is a description for the card.');
  }, 3_000);

  afterAll(async () => await browser?.close?.());
});
