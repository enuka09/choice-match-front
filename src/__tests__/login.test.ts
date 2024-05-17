import webdriver, { until } from "selenium-webdriver";
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

test("allows the user to login via UserLogin component", async () => {
  await driver.get("http://localhost:3000");
  const openLoginDrawerButton = await driver.wait(until.elementLocated(webdriver.By.id("loginButton")), 15000);
  await openLoginDrawerButton.click();

  const emailInput = await driver.wait(until.elementLocated(webdriver.By.id("loginEmail")), 15000);
  const passwordInput = await driver.wait(until.elementLocated(webdriver.By.id("loginPassword")), 15000);
  const loginButton = await driver.wait(until.elementLocated(webdriver.By.css('button[type="submit"]')), 15000);

  await emailInput.sendKeys("enuka@test.com");
  await passwordInput.sendKeys("testPass");
  await loginButton.click();

  await driver.sleep(5000);
});
