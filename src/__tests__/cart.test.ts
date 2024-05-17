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

describe("CartDrawer Component Tests", () => {
  test("User can add items to the shopping cart", async () => {
    await driver.get("http://localhost:3000");

    const addItemButton = await driver.wait(until.elementLocated(By.id("addItemButton")), 5000);
    await addItemButton.click();

    const openCartButton = await driver.findElement(By.id("openCartButton"));
    await openCartButton.click();

    const cartItemCount = await driver.wait(until.elementLocated(By.id("cartItemCount")), 5000);
    expect(await cartItemCount.getText()).not.toBe("0");

    const checkoutButton = await driver.findElement(By.id("checkoutButton"));
    await checkoutButton.click();

    await driver.sleep(1000);
  }, 30000);
});
