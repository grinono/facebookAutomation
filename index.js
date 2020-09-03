require("dotenv").config();
const puppeteer = require("puppeteer");

const EMAIL = process.env.FACEBOOK_EMAIL;
const PASSWORD = process.env.FACEBOOK_PASSWORD;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.messenger.com/", { waitUntil: "networkidle2" });

  await page.type("[name=email]", EMAIL, { delay: 150 });
  await page.type("[name=pass]", PASSWORD, { delay: 150 });

  // Wait til submit button is clicked and the page is loaded
  const navigationPromise = page.waitForNavigation();

  await page.keyboard.press("Enter");

  // End Wait
  await navigationPromise;

  // Your Messenger Receipient URL
  const MESSENGER_URL = "https://www.messenger.com/t/walter.dewiel";

  await page.goto(MESSENGER_URL, { waitUntil: "networkidle0" });

  /*********************************************************************
   *                          SEND MESSAGE                             *
   *********************************************************************/
  async function SendMessage(messageText) {
    page
      .type("div[role=combobox]", messageText)
      .then(() => {
        page.keyboard.press("Enter");
      })
      .catch((e) => {
        console.log("Just to quickly!!! But it's still running!");
      });
  }

  await SendMessage("hi Walter how are you");
})();
