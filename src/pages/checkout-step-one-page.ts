import { Page } from "@playwright/test";
import { BasePage } from "./base-page";


export class CheckoutStepOnePage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = '/checkout-step-one.html';
    this.title = 'Swag Labs';
  }
}
