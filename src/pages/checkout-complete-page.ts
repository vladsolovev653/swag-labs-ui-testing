import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";


/**
 * Страница успешного подтверждения заказа
 */
export class CheckoutCompletePage extends BasePage {
  readonly completeHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/checkout-complete.html';
    this.title = 'Swag Labs';
    this.completeHeading = this.page.locator('h2[data-test="complete-header"]');
  }
}
