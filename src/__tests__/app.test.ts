import webdriver from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

let driver: webdriver.ThenableWebDriver;

jest.setTimeout(30000);

beforeAll(async () => {
  const options = new chrome.Options();

  driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build();
});

afterAll(async () => {
  await driver.quit();
});

test("checks page title accuracy", async () => {
  await driver.get("http://localhost:3000");
  const title = await driver.getTitle();
  expect(title).toBe("Choice Match | Home");
});
