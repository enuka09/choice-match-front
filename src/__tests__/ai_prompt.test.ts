import webdriver, { By, until, ThenableWebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

let driver: ThenableWebDriver;

beforeAll(async () => {
  const options = new chrome.Options();
  driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build();
});

afterAll(async () => {
  await driver.quit();
});

describe("EntityInputForm Component Tests", () => {
  test("User can toggle gender, submit preferences, and view recommendations", async () => {
    await driver.get("http://localhost:3000/entity-input");

    const toggleGenderButton = await driver.wait(until.elementLocated(By.id("toggleGenderButton")), 5000);
    await toggleGenderButton.click();

    const sentenceInput = await driver.findElement(By.id("fashionSentenceInput"));
    await sentenceInput.sendKeys("Elegant evening wear for a formal event");

    const submitButton = await driver.findElement(By.id("submitButton"));
    await submitButton.click();

    await driver.sleep(5000);

    const recommendations = await driver.findElements(By.className("fashion-pair"));
    expect(recommendations.length).toBeGreaterThan(0);
  }, 30000);
});
