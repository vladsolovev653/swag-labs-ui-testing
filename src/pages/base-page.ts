import { Page } from '@playwright/test';
import * as path from 'path';


export abstract class BasePage {
  readonly page: Page;
  protected url: string;
  protected title: string;

  constructor(page: Page) {
    this.page = page;
  }

  public async isLoaded(): Promise<void> {
    await this.page.waitForURL(this.url);
    
    const currentPageTitle = await this.page.title();
    if (currentPageTitle !== this.title) {
      throw new Error(`Ожидаемое название страницы: ${this.title}, фактическое: ${currentPageTitle}`);
    }
  }

  public async open(): Promise<void> {
    await this.page.goto(this.url);
    await this.isLoaded();
  }

  public async screenshot(): Promise<void> {
    const rootDir = path.resolve(__dirname);
    await this.page.screenshot({ path: path.join(rootDir, 'playwright-report', 'screenshots') });
  }
}
