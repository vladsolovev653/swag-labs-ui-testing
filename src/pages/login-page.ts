import { Locator, Page } from '@playwright/test';
import { InventoryPage } from './inventory-page';
import { BasePage } from './base-page';


/**
 * Страница Авторизации.
 */
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.url = '/';
    this.title = 'Swag Labs';
    this.usernameInput = this.page.locator('input[data-test="username"]');
    this.passwordInput = this.page.locator('input[data-test="password"]');
    this.loginBtn = this.page.locator('input[data-test="login-button"]');
  }


  /**
   * Авторизация.
   * @param username Имя пользователя 
   * @param password Пароль
   * @returns Экземпляр класса InventoryPage.
   */
  public async login(username: string, password: string): Promise<InventoryPage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();

    const invenotyPage = new InventoryPage(this.page);
    await invenotyPage.isLoaded();
    return invenotyPage;
  }
}
