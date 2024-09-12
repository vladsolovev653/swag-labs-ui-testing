import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutStepTwoPage } from "./checkout-step-two-page";


export class CheckoutStepOnePage extends BasePage {
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueBtn: Locator;
  
  constructor(page: Page) {
    super(page);
    this.url = '/checkout-step-one.html';
    this.title = 'Swag Labs';
    this.heading = this.page.locator('span[data-test="title"]');
    this.firstNameInput = this.page.locator('input[data-test="firstName"]');
    this.lastNameInput = this.page.locator('input[data-test="lastName"]');
    this.postalCodeInput = this.page.locator('input[data-test="postalCode"]');
    this.continueBtn = this.page.locator('input[data-test="continue"]');
  }

  public async enterUserInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  public async gotoStepTwo(): Promise<CheckoutStepTwoPage> {
    await this.continueBtn.click();

    const checkoutStepTwoPage = new CheckoutStepTwoPage(this.page);
    await checkoutStepTwoPage.isLoaded();
    return checkoutStepTwoPage;
  }
}
