import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutStepOnePage } from "./checkout-step-one-page";


export class CartPage extends BasePage {
  readonly heading: Locator;
  readonly itemTitle: Locator;
  readonly itemDesc: Locator;
  readonly itemPrice: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/cart.html';
    this.title = 'Swag Labs';
    this.heading = this.page.locator('span[data-test="title"]');
    this.itemTitle = this.page.locator('//a[@data-test="item-4-title-link"]//div[@data-test="inventory-item-name"]');
    this.itemDesc = this.page.locator('//a[@data-test="item-4-title-link"]/following-sibling::div[@data-test="inventory-item-desc"]');
    this.itemPrice = this.page.locator('//a[@data-test="item-4-title-link"]/following-sibling::div[@class="item_pricebar"]//div[@data-test="inventory-item-price"]');
    this.checkoutBtn = this.page.locator('#checkout');
  }

  async openCheckOutPage(): Promise<CheckoutStepOnePage> {
    await this.checkoutBtn.click();

    const checkoutStepOnePage = new CheckoutStepOnePage(this.page);
    await checkoutStepOnePage.isLoaded();
    return checkoutStepOnePage;
  }
}