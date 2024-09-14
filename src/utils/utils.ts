import { Page, TestInfo } from "@playwright/test";


export class Utils {
  public static async screenshot(page: Page, testInfo: TestInfo): Promise<void> {
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  }
}
