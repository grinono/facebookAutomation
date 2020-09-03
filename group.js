require("dotenv").config();

const puppeteer = require("puppeteer");

const EMAIL = process.env.FACEBOOK_EMAIL;
const PASSWORD = process.env.FACEBOOK_PASSWORD;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-notifications"],
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.facebook.com/groups/1696874823760048/members/", {
    waitUntil: "networkidle2",
  });

  await page.type("[name=email]", EMAIL, { delay: 150 });
  await page.type("[name=pass]", PASSWORD, { delay: 150 });

  await page.keyboard.press("Enter");

  await page.waitForNavigation({ waitUntil: "networkidle2" });

  console.log("page loded");
  await page.evaluate(async () => {
    console.log("start scroll");
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 1000);
    });
  });
})();
