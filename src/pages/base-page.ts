import { Page } from '@playwright/test';


/**
 * Класс базовой страницы
 * Не используется напрямую
 */
export abstract class BasePage {
  readonly page: Page;
  protected url: string;
  protected title: string;

  constructor(page: Page) {
    this.page = page;
  }

  
  /**
   * Проверка, что страница загружена 
   * Ждет url страницы и проверяет название 
   */
  public async isLoaded(): Promise<void> {
    await this.page.waitForURL(this.url, { waitUntil: 'load' });
    
    const currentPageTitle = await this.page.title();
    if (currentPageTitle !== this.title) {
      throw new Error(`Ожидаемое название страницы: ${this.title}, фактическое: ${currentPageTitle}`);
    }
  }

  
  /**
   * Открывает страницу и проверяет успешно загрузки
   */
  public async open(): Promise<void> {
    await this.page.goto(this.url);
    await this.isLoaded();
  }
}
