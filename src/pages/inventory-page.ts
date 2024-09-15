import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { CartPage } from './cart-page';


/**
 * Страница с товарами
 */
export class InventoryPage extends BasePage {
  readonly heading: Locator;
  readonly cartBadge: Locator;
  readonly addBackpackBtn: Locator;
  readonly removeBackPackBtn: Locator;
  readonly cartLink: Locator;
  readonly backpackTitle: Locator;
  readonly backpackDesc: Locator;
  readonly backpackPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/inventory.html';
    this.title = 'Swag Labs';
    this.heading = this.page.locator('span[data-test="title"]');
    this.cartBadge = this.page.locator('span[data-test="shopping-cart-badge"]');
    this.addBackpackBtn = this.page.locator('#add-to-cart-sauce-labs-backpack');
    this.removeBackPackBtn = this.page.locator('#remove-sauce-labs-backpack');
    this.cartLink = this.page.locator('a[data-test="shopping-cart-link"]');
    this.backpackTitle = this.page.locator('//a[@data-test="item-4-title-link"]//div[@data-test="inventory-item-name"]');
    this.backpackDesc = this.page.locator('//a[@data-test="item-4-title-link"]/following-sibling::div[@data-test="inventory-item-desc"]');
    this.backpackPrice = this.page.locator('//a[@data-test="item-4-title-link"]/ancestor::div[@class="inventory_item_label"]/following-sibling::div[@class="pricebar"]//div[@data-test="inventory-item-price"]');
  }


  /**
   * Переход в корзину
   * @returns Экземпляр класса CartPage
   */
  public async openCartPage(): Promise<CartPage> {
    await this.cartLink.click();

    const cartPage = new CartPage(this.page);
    await cartPage.isLoaded();
    return cartPage;
  }
}
