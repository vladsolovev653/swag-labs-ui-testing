import { Page, expect } from '@playwright/test';

/**
 * Класс базовой страницы.
 * Не используется напрямую.
 */
export abstract class BasePage {
  readonly page: Page;
  protected url: string;
  protected title: string;

  constructor(page: Page) {
    this.page = page;
  }

  
  /**
   * Проверяет, что страница успешно загружена.
   * Ждет URL страницы и проверяет название.
   */
  public async isLoaded(): Promise<void> {
    await this.page.waitForURL(this.url, { waitUntil: 'load' });
    await expect(this.page).toHaveTitle(this.title);
  }

  
  /**
   * Открытие страницы и проверка успешной загрузки.
   */
  public async open(): Promise<void> {
    await this.page.goto(this.url);
    await this.isLoaded();
  }
}
