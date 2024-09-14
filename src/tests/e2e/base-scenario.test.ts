import { test, expect } from '../fixtures';


test('Базовый сценарий пользователя', async ({ 
  userData,
  loginPage, 
  inventoryPage, 
  cartPage, 
  checkoutStepOnePage,
  checkoutStepTwoPage,
  checkoutCompletePage
}, testInfo) => {
  
  await test.step('Авторизация валидным пользователем', async () => {
    const username = process.env.STANDART_USER_LOGIN as string;
    const password = process.env.PASSWORD as string;

    await loginPage.open();
    inventoryPage = await loginPage.login(username, password);
    await expect(inventoryPage.heading).toBeVisible();
    await inventoryPage.screenshot(testInfo);
  });

  await test.step('Добавление товара в корзину', async () => {
    await inventoryPage.addBackpackBtn.click();
    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.screenshot(testInfo);

    userData['title'] = await inventoryPage.backpackTitle.textContent();
    userData['desc'] = await inventoryPage.backpackDesc.textContent();
    userData['price'] = await inventoryPage.backpackPrice.textContent();
  });

  await test.step('Переход в Коризну', async () => {
    cartPage = await inventoryPage.openCartPage();
    await expect(cartPage.heading).toBeVisible();
  });

  await test.step('Проверка товара', async () => {
    await cartPage.screenshot(testInfo);

    await expect(cartPage.itemTitle).toBeVisible();
    expect(await cartPage.itemTitle.textContent()).toBe(userData['title']);

    await expect(cartPage.itemDesc).toBeVisible();
    expect(await cartPage.itemDesc.textContent()).toBe(userData['desc']);

    await expect(cartPage.itemPrice).toBeVisible();
    expect(await cartPage.itemPrice.textContent()).toBe(userData['price']);
  });

  await test.step('Переход на страницу ввода данных доставки', async () => {
    await expect(cartPage.checkoutBtn).toBeVisible();
    checkoutStepOnePage = await cartPage.openCheckOutPage();
    await expect(checkoutStepOnePage.heading).toBeVisible();
    await checkoutStepOnePage.screenshot(testInfo);
  });

  await test.step('Ввод данных доставки', async () => {
    await checkoutStepOnePage.enterUserInfo('Test', 'User', '109111');
    await checkoutStepOnePage.screenshot(testInfo);
  });

  await test.step('Переход на страницу подтверждения доставки', async () => {
    checkoutStepTwoPage = await checkoutStepOnePage.gotoStepTwo();
    await expect(checkoutStepTwoPage.heading).toBeVisible();
    await checkoutStepTwoPage.screenshot(testInfo);
  });

  await test.step('Подтверждение доставки', async () => {
    await expect(checkoutStepTwoPage.finishBtn).toBeVisible();
    checkoutCompletePage = await checkoutStepTwoPage.finishCheckout();
    await expect(checkoutCompletePage.completeHeading).toBeVisible();
    await expect(checkoutCompletePage.completeHeading).toHaveText('Thank you for your order!');
  });
});
