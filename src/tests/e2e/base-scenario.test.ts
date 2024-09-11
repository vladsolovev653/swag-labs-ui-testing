import { test, expect } from '../fixtures';


test('Базовый сценарий пользователя', async ({ 
  userData, 
  loginPage, 
  inventoryPage, 
  cartPage, 
  checkoutStepOnePage 
}) => {
  
  await test.step('Авторизация валидным пользователем', async () => {
    const username = process.env.STANDART_USER_LOGIN as string;
    const password = process.env.PASSWORD as string;

    await loginPage.open();
    inventoryPage = await loginPage.login(username, password);
    await expect(inventoryPage.heading).toBeVisible();
  });

  await test.step('Добавление товара в корзину', async () => {
    await inventoryPage.addBackpackBtn.click();
    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    userData['title'] = await inventoryPage.backpackTitle.textContent();
    userData['desc'] = await inventoryPage.backpackDesc.textContent();
    userData['price'] = await inventoryPage.backpackPrice.textContent();
  });

  await test.step('Переход в Коризну', async () => {
    cartPage = await inventoryPage.openCartPage();
    await expect(cartPage.heading).toBeVisible();
  });

  await test.step('Проверка товара', async () => {
    await expect(cartPage.itemTitle).toBeVisible();
    expect(await cartPage.itemTitle.textContent()).toBe(userData['title']);

    await expect(cartPage.itemDesc).toBeVisible();
    expect(await cartPage.itemDesc.textContent()).toBe(userData['desc']);

    await expect(cartPage.itemPrice).toBeVisible();
    expect(await cartPage.itemPrice.textContent()).toBe(userData['price']);
  });

  await test.step('Переход на страницу ввода информации', async () => {
    await expect(cartPage.checkoutBtn).toBeVisible();
    checkoutStepOnePage = await cartPage.openCheckOutPage();
  });
});
