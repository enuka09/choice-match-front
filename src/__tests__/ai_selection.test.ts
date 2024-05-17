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

describe("SelectionBasedRecommendations Component Tests", () => {
  test("User can select preferences and receive fashion recommendations", async () => {
    await driver.get("http://localhost:3000/selection-based-recommendations");

    const genderToggle = await driver.findElement(By.id("genderToggle"));
    await genderToggle.click();
    const ageSelect = await driver.findElement(By.id("Age"));
    await ageSelect.sendKeys("25-34");
    const skinColorSelect = await driver.findElement(By.id("Skin color"));
    await skinColorSelect.sendKeys("Medium");
    const fashionTypeButton = await driver.findElement(By.xpath("//button[@aria-label='Formal Outfit']"));
    await fashionTypeButton.click();
    const submitButton = await driver.findElement(By.id("submitButton"));
    await submitButton.click();
    await driver.wait(until.elementLocated(By.className("fashion-pair")), 10000);
    const recommendations = await driver.findElements(By.className("fashion-pair"));
    expect(recommendations.length).toBeGreaterThan(0);
  }, 30000);
});
