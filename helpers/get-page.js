import puppeteer from "puppeteer";

export default async function initGetBrowserPage() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-notifications",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1300,
    height: 750,
    isMobile: false,
  });

  await page.setDefaultNavigationTimeout(120000);

  return {
    page: page,
    browser: browser,
  };
}
