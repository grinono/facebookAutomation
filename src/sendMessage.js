// Environment Variables
require("dotenv").config();

// User Imports
const {
  launchBrowser,
  launchPage,
  sendMessage,
} = require("../handlers/puppeteerHelper");
const { getRandomInt } = require("../handlers/generalHandler");
const { findAll } = require("../handlers/databaseHandler");

// GLOBAL Variables
const LOOP_THROUGH_DATABASE = true;
const MESSAGE_TO_SENT = "Hey!";
const INDIVIDUAL_SENT = "https://m.me/110035443798530";

// Spammer
(async () => {
  const browser = await launchBrowser(false, { proxy: false });
  const page = await launchPage(browser, { originPage: false });
  await page.goto("https://www.messenger.com/", { waitUntil: "networkidle2" });

  await page.type("[name=email]", process.env.FACEBOOK_EMAIL, { delay: 150 });
  await page.type("[name=pass]", process.env.FACEBOOK_PASSWORD, { delay: 150 });

  // Wait til submit button is clicked and the page is loaded
  const navigationPromise = page.waitForNavigation();
  await page.keyboard.press("Enter");
  await navigationPromise;

  // Your Messenger Receipient URL
  if (LOOP_THROUGH_DATABASE) {
    const docs = await findAll();
    for (doc of docs) {
      console.log(`[✨] Sending Message To ${doc.name}`);
      await page.goto(doc.me, { waitUntil: "networkidle0" });
      await sendMessage(page, Message(doc.name));
      await page.waitFor(getRandomInt(10000, 20001));
    }
  } else {
    await page.goto(INDIVIDUAL_SENT, { waitUntil: "networkidle0" });
    await sendMessage(page, MESSAGE_TO_SENT);
  }

  // Clear
  await page.waitFor(getRandomInt(10000, 20001));
  await browser.close();
})();

const Message = (fullName) => {
  const firstname = fullName.split(" ")[0];
  console.log("firstname:", firstname);
  return `Hi ${firstname}, are you good`;
};
