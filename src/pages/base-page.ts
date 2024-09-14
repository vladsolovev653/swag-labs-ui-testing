import { Page, TestInfo } from '@playwright/test';


export abstract class BasePage {
  readonly page: Page;
  protected url: string;
  protected title: string;

  constructor(page: Page) {
    this.page = page;
  }

  public async isLoaded(): Promise<void> {
    await this.page.waitForURL(this.url, { waitUntil: 'load' });
    
    const currentPageTitle = await this.page.title();
    if (currentPageTitle !== this.title) {
      throw new Error(`Ожидаемое название страницы: ${this.title}, фактическое: ${currentPageTitle}`);
    }
  }

  public async screenshot(testInfo: TestInfo): Promise<void> {
    const screenshot = await this.page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  }

  public async open(): Promise<void> {
    await this.page.goto(this.url);
    await this.isLoaded();
  }
}
