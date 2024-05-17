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

describe("UserSignup Component Tests", () => {
  test("User can sign up using the signup form", async () => {
    await driver.get("http://localhost:3000");
    const openLoginDrawerButton = await driver.wait(until.elementLocated(webdriver.By.id("signupButton")), 15000);
    await openLoginDrawerButton.click();

    await driver.findElement(By.id("fullName")).sendKeys("Enuka Pinsara");
    await driver.findElement(By.id("email")).sendKeys("enuka@test.com");
    await driver.findElement(By.id("password")).sendKeys("testPass");
    await driver.findElement(By.id("confirmPassword")).sendKeys("testPass");
    await driver.findElement(By.id("phone")).sendKeys("1234567890");
    await driver.findElement(By.id("dob")).sendKeys("2002-11-11");
    await driver.findElement(By.id("genderMale")).click();

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.sleep(1000);

    const successMessage = await driver.wait(until.elementLocated(By.id("successMessage")), 5000);
    expect(await successMessage.getText()).toContain("Congratulations");
  }, 30000);
});
