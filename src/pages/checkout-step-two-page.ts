import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutCompletePage } from "./checkout-complete-page";

export class CheckoutStepTwoPage extends BasePage {
  readonly heading: Locator;
  readonly finishBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/checkout-step-two.html';
    this.title = 'Swag Labs';
    this.heading = this.page.locator('span[data-test="title"]');
    this.finishBtn = this.page.locator('button[data-test="finish"]');
  }

  public async finishCheckout(): Promise<CheckoutCompletePage> {
    await this.finishBtn.click();
    
    const checkoutCompletePage = new CheckoutCompletePage(this.page);
    await checkoutCompletePage.isLoaded();
    return checkoutCompletePage;
  }
}
