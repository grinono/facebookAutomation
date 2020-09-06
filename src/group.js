// Environment Variables
require("dotenv").config();

// User Imports
const { launchBrowser, launchPage } = require("../handlers/puppeteerHelper");
const { handleResponse } = require("../handlers/responseHandler");
const { handleRequest } = require("../handlers/requestHandler");

// Browser
let browser;

// Hummingbird
(async () => {
  // Launching & Creating New Tab
  browser = await launchBrowser(false);
  const page = await launchPage(browser, { originPage: false });

  // Network Interception
  await page.setRequestInterception(true);

  // On Request Event
  page.on("request", handleRequest);

  // On Response
  page.on("response", handleResponse);

  // Navigating To Group Memebers
  await page.goto("https://www.facebook.com/groups/1696874823760048/members/", {
    timeout: 60000,
    waitUntil: "networkidle2",
  });

  // Logging In
  await page.type("[type=text]", process.env.FACEBOOK_EMAIL, { delay: 150 });
  await page.type("[type=password]", process.env.FACEBOOK_PASSWORD, { delay: 150 });

  // Wait til submit button is clicked and the page is loaded
  const navigationPromise = page.waitForNavigation({ waitUntil: "networkidle2" });
  await page.keyboard.press("Enter");
  await navigationPromise;

  // Scrolling
  while (true) await Promise.all([await page.mouse.wheel({ deltaY: 1750 }), await page.waitFor(5000)]);
})();

// Over & Out!
process.once("SIGINT", function () {
  console.log("[✅] Closing browser");
  if (browser) {
    browser.close().then(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
