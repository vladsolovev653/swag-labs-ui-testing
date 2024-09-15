import { Page, TestInfo } from "@playwright/test";



/**
 * Делает скриншот страницы и прикрепляет к тесту отчету теста
 * @param page Экземляр Page
 * @param testInfo Экземпляр TestInfo
 */
export const screenshot = async (page: Page, testInfo: TestInfo): Promise<void> => {
  const screenshot = await page.screenshot();
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
}
