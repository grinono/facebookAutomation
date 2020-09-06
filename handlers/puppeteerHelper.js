// Packages Import
const puppeteer = require("puppeteer-extra");

// AdblockerPlugin & StealthPlugin (All Evasion Techniques)
puppeteer.use(require("puppeteer-extra-plugin-adblocker")());
puppeteer.use(require("puppeteer-extra-plugin-stealth")());

// Launch Browser
module.exports.launchBrowser = (headless) => {
  return new Promise(async (resolve, reject) => {
    try {
      const args = [
        "--disable-backgrounding-occluded-windows",
        "--disable-background-timer-throttling",
        "--ignore-certifcate-errors-spki-list",
        "--disable-renderer-backgrounding",
        "--ignore-certifcate-errors",
        "--disable-setuid-sandbox",
        "--disable-notifications",
        "--window-size=1220,950",
        "--window-position=0,0",
        "--disable-infobars",
        "--no-sandbox",
      ];

      const browser = await puppeteer.launch({
        args,
        headless,
        defaultViewport: { width: 1200, height: 800 },
        ignoreHTTPSErrors: true,
      });

      resolve(browser);
    } catch (error) {
      console.log("Browser Launch Error: ", error);
      reject(error);
    }
  });
};

// Launch Page
module.exports.launchPage = (browser, opts = { blockResources: false, originPage: true }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create New Page
      const page = await browser.newPage();

      // Delete Origin Page
      if (!opts.originPage) await (await browser.pages())[0].close();

      // Set user agent for page.
      await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0");

      // JavaScript Injection
      await page.evaluateOnNewDocument(() => {
        // store the existing descriptor
        const elementDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight");

        // redefine the property with a patched descriptor
        Object.defineProperty(HTMLDivElement.prototype, "offsetHeight", {
          ...elementDescriptor,
          get: function () {
            if (this.id === "modernizr") {
              return 1;
            }
            return elementDescriptor.get.apply(this);
          },
        });
      });

      // Blocked Resources
      if (opts.blockResources === true) {
        const blockedResources = [
          "image",
          "stylesheet",
          "media",
          "font",
          "texttrack",
          "object",
          "beacon",
          "csp_report",
          "imageset",
        ];

        // Set Request Interception to avoid receiving images, fonts and stylesheets for fast speed
        await page.setRequestInterception(true);
        page.on("request", (req) => {
          if (blockedResources.includes(req.resourceType())) {
            req.abort();
          } else {
            req.continue();
          }
        });
      }

      // Set Extra Header for request
      await page.setExtraHTTPHeaders({ "accept-language": "en-US,en;q=0.8" });

      // Resolve
      resolve(page);
    } catch (error) {
      console.log("Launch Page Error: ", error);
      // Reject
      reject(error);
    }
  });
};

// Send Message
module.exports.sendMessage = (page, messageText) =>
  new Promise((resolve, reject) => {
    page
      .type("div[role=combobox]", messageText, { delay: 150 })
      .then(() => {
        page.keyboard.press("Enter");
        resolve(true);
      })
      .catch((e) => {
        console.log({ type: e.type, message: e.message });
        reject(false);
      });
  });
