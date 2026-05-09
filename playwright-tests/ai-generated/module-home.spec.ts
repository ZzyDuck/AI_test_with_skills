import { test, expect } from '@playwright/test';

const LOGIN_URL = 'http://10.28.149.50:9432/login/v1/#/login';
const HOME_URL = 'http://10.28.149.50:9432/iam/v1/#/home/homeManage';
const LOGIN_USERNAME = 'admin';
const PASSWORD = 'Asiainfo1@3';

async function login(page) {
  await page.goto(LOGIN_URL);
  await page.waitForLoadState('networkidle');
  
  await page.getByPlaceholder('请输入帐号/手机号/邮箱').fill(LOGIN_USERNAME);
  await page.getByPlaceholder('请输入密码').fill(PASSWORD);
  
  await page.click('button.btn_login');
  await page.waitForLoadState('networkidle');
}

test.describe('首页视图模块测试', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto(HOME_URL);
    await page.waitForLoadState('networkidle');
  });

  test('TC-HOME-001: 用户信息展示', async ({ page }) => {
    const userName = page.locator('.user-name');
    const userRole = page.locator('.user-role');
    const loginCount = page.locator('.login-count');
    
    await expect(userName).toBeVisible();
    await expect(userRole).toBeVisible();
    await expect(loginCount).toBeVisible();
  });

  test('TC-HOME-002: 密码到期日展示', async ({ page }) => {
    const passwordExpiry = page.locator('.password-expiry');
    
    await expect(passwordExpiry).toBeVisible();
    const expiryText = await passwordExpiry.textContent();
    expect(expiryText).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  test('TC-HOME-003: 公告列表展示', async ({ page }) => {
    const noticeList = page.locator('.notice-list');
    
    await expect(noticeList).toBeVisible();
  });

  test('TC-HOME-004: 公告区域无数据显示', async ({ page }) => {
    const noticeArea = page.locator('.notice-area');
    
    await noticeArea.waitFor();
    const emptyState = page.locator('.empty-state, .no-data');
    
    if (await emptyState.isVisible()) {
      await expect(emptyState).toContainText('暂无数据');
    }
  });

  test('TC-HOME-005: 切换至金库待审批Tab', async ({ page }) => {
    const vaultTab = page.getByRole('tab', { name: /金库待审批/ });
    
    await vaultTab.click();
    await page.waitForLoadState('networkidle');
    
    await expect(vaultTab).toHaveClass(/active/);
  });

  test('TC-HOME-006: 搜索应用', async ({ page }) => {
    const searchInput = page.getByPlaceholder('搜索应用');
    const searchButton = page.getByRole('button', { name: /搜索/ });
    
    await searchInput.fill('测试应用');
    await searchButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('TC-HOME-007: 未勾选应用点击申请资源', async ({ page }) => {
    const applyButton = page.getByRole('button', { name: /申请资源/ });
    
    await applyButton.click();
    
    const alertDialog = page.locator('.el-dialog__body, .modal-content');
    await expect(alertDialog).toContainText('请先选择应用');
  });

  test('TC-HOME-008: 搜索框超长输入', async ({ page }) => {
    const searchInput = page.getByPlaceholder('搜索应用');
    const longText = 'a'.repeat(150);
    
    await searchInput.fill(longText);
    const inputValue = await searchInput.inputValue();
    
    expect(inputValue.length).toBeLessThanOrEqual(100);
  });

  test('TC-HOME-009: 页面刷新后Tab状态保持', async ({ page }) => {
    const vaultTab = page.getByRole('tab', { name: /金库待审批/ });
    
    await vaultTab.click();
    await page.waitForLoadState('networkidle');
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    await expect(vaultTab).toHaveClass(/active/);
  });

  test('TC-HOME-010: 搜索框特殊字符', async ({ page }) => {
    const searchInput = page.getByPlaceholder('搜索应用');
    const searchButton = page.getByRole('button', { name: /搜索/ });
    
    await searchInput.fill('@#$%^&*()');
    await searchButton.click();
    await page.waitForLoadState('networkidle');
  });
});