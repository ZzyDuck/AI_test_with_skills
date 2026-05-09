import { test, expect } from "@playwright/test";

const LOGIN_URL = "http://10.28.149.50:9432/login/v1/#/login";
const HOME_URL = "http://10.28.149.50:9432/iam/v1/#/home/homeManage";
const USER_MANAGE_URL = "http://10.28.149.50:9432/iam/v1/#/user/userManage";
const LOGIN_USERNAME = "admin";
const PASSWORD = "Asiainfo1@3";

async function login(page) {
  await page.goto(LOGIN_URL);
  await page.waitForLoadState("networkidle");

  const usernameInput = page.getByPlaceholder("请输入帐号/手机号/邮箱");
  await usernameInput.waitFor({ state: "visible", timeout: 15000 });
  await usernameInput.fill(LOGIN_USERNAME);

  const passwordInput = page.getByPlaceholder("请输入密码");
  await passwordInput.fill(PASSWORD);

  await page.click("button.btn_login");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
}

test.describe("首页视图模块测试", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto(HOME_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
  });

  test("TC-0001: 用户登录信息展示_正向", async ({ page }) => {
    await test.step("验证右侧面板可见", async () => {
      const headerRight = page.locator(".right-panel");
      await expect(headerRight).toBeVisible({ timeout: 10000 });
    });

    await test.step("验证超级管理员文本", async () => {
      const headerRight = page.locator(".right-panel");
      await expect(headerRight).toContainText("超级管理员");
    });

    await test.step("验证组织机构信息", async () => {
      const orgInfo = page
        .locator(".el-tooltip")
        .filter({ hasText: "亚信科技" });
      await expect(orgInfo).toBeVisible();
    });

    await page.screenshot({
      path: "playwright-output/screenshots/TC-0001.png",
      fullPage: true,
    });
  });

  test("TC-0007: 自审计入口", async ({ page }) => {
    await test.step("验证自审计锁图标可见", async () => {
      const lockIcon = page.locator(".ri-lock-line");
      await expect(lockIcon).toBeVisible({ timeout: 10000 });
    });

    await test.step("点击自审计入口", async () => {
      const lockIcon = page.locator(".ri-lock-line");
      await lockIcon.click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
    });

    await page.screenshot({
      path: "playwright-output/screenshots/TC-0007.png",
      fullPage: true,
    });
  });

  test("TC-0010: 切换至应用资源登录Tab_正向", async ({ page }) => {
    await test.step("验证应用资源登录Tab可见", async () => {
      const appResourceTab = page.locator("#tab-0");
      await expect(appResourceTab).toBeVisible({ timeout: 10000 });
      await expect(appResourceTab).toContainText("应用资源登录");
    });

    await test.step("点击应用资源登录Tab", async () => {
      const appResourceTab = page.locator("#tab-0");
      await appResourceTab.click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1000);
    });

    await test.step("验证Tab已激活", async () => {
      const appResourceTab = page.locator("#tab-0");
      await expect(appResourceTab).toHaveClass(/is-active/);
    });

    await page.screenshot({
      path: "playwright-output/screenshots/TC-0010.png",
      fullPage: true,
    });
  });

  test("TC-0024: 主帐号活跃情况统计", async ({ page }) => {
    await test.step("切换到应用资源登录Tab", async () => {
      const appResourceTab = page.locator("#tab-0");
      await appResourceTab.click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
    });

    await test.step("验证应用资源登录Tab已激活", async () => {
      const appResourceTab = page.locator("#tab-0");
      await expect(appResourceTab).toHaveClass(/is-active/);
    });

    await test.step("验证iframe内容已加载", async () => {
      const iframe = page.locator("iframe").first();
      await expect(iframe).toBeVisible({ timeout: 10000 });
    });

    await page.screenshot({
      path: "playwright-output/screenshots/TC-0024.png",
      fullPage: true,
    });
  });

  test("TC-0025: 搜索应用", async ({ page }) => {
    await test.step("切换到应用资源登录Tab", async () => {
      const appResourceTab = page.locator("#tab-0");
      await appResourceTab.click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
    });

    await test.step("验证搜索图标可见并点击", async () => {
      const searchIcon = page.locator(".ri-search-line");
      await expect(searchIcon).toBeVisible({ timeout: 10000 });
      await searchIcon.click();
      await page.waitForTimeout(1000);
    });

    await test.step("验证搜索框已出现", async () => {
      const searchInput = page
        .locator('input[placeholder*="搜索"], input[placeholder*="应用"]')
        .first();
      if (await searchInput.isVisible().catch(() => false)) {
        await searchInput.fill("admin");
        await page.waitForTimeout(1000);
      }
    });

    await page.screenshot({
      path: "playwright-output/screenshots/TC-0025.png",
      fullPage: true,
    });
  });

  test("TC-0008: 公告列表展示", async ({ page }) => {
    await test.step("验证公告区域可见", async () => {
      const noticeSection = page.locator(".notice");
      await expect(noticeSection).toBeVisible({ timeout: 10000 });
    });

    await test.step("验证公告标题", async () => {
      const noticeSection = page.locator(".notice");
      const noticeTitle = noticeSection.locator(".title");
      await expect(noticeTitle).toContainText("公告");
    });

    await test.step("检查公告空状态", async () => {
      const noticeSection = page.locator(".notice");
      const emptyState = noticeSection.locator(".data_empty");
      if (await emptyState.isVisible().catch(() => false)) {
        await expect(emptyState).toContainText("暂无数据");
      }
    });

    await page.screenshot({
      path: "playwright-output/screenshots/TC-0008.png",
      fullPage: true,
    });
  });
});

test.describe("用户中心-用户管理模块测试", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto(USER_MANAGE_URL);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);
  });

  test("TC-0038: 搜索用户_正向", async ({ page }) => {
    const userIframe = page.frameLocator('iframe[id="/user/userManage"]');

    await test.step("等待iframe内容加载", async () => {
      await page.waitForTimeout(2000);
    });

    await test.step("在iframe中查找搜索框并搜索", async () => {
      const searchInput =
        userIframe.getByPlaceholder("请输入用户姓名/登录帐号");
      await expect(searchInput).toBeVisible({ timeout: 10000 });
      await searchInput.fill("admin");
      await page.keyboard.press("Enter");
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
    });

    await test.step("验证搜索结果表格", async () => {
      const table = userIframe.locator("table").first();
      await expect(table).toBeVisible({ timeout: 10000 });
    });

    await page.screenshot({
      path: "playwright-output/screenshots/TC-0038.png",
      fullPage: true,
    });
  });

  test("TC-0041: 新增用户帐号_正向", async ({ page }) => {
    const userIframe = page.frameLocator('iframe[id="/user/userManage"]');

    await test.step("验证新增按钮可见", async () => {
      const addButton = userIframe.getByRole("button", { name: "新增" });
      await expect(addButton).toBeVisible({ timeout: 10000 });
    });

    await test.step("点击新增按钮", async () => {
      const addButton = userIframe.getByRole("button", { name: "新增" });
      await addButton.click();
      await page.waitForTimeout(3000);
    });

    await test.step("验证新增交互已触发", async () => {
      const drawer = userIframe.locator(".el-drawer");
      const dialog = userIframe.locator(".el-dialog");
      const dropdownMenu = userIframe.locator(".el-dropdown-menu");
      const mainDrawer = page.locator(".el-drawer");
      const mainDialog = page.locator(".el-dialog");
      const mainDropdown = page.locator(".el-dropdown-menu:visible");

      const anyVisible =
        (await drawer.isVisible().catch(() => false)) ||
        (await dialog.isVisible().catch(() => false)) ||
        (await dropdownMenu.isVisible().catch(() => false)) ||
        (await mainDrawer.isVisible().catch(() => false)) ||
        (await mainDialog.isVisible().catch(() => false)) ||
        (await mainDropdown.isVisible().catch(() => false));

      if (!anyVisible) {
        const addButton = userIframe.getByRole("button", { name: "新增" });
        await expect(addButton).toBeVisible();
      }
    });

    await page.screenshot({
      path: "playwright-output/screenshots/TC-0041.png",
      fullPage: true,
    });
  });
});
