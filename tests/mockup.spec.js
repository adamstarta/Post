const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const screenshotDir = path.join(__dirname, '..', 'screenshots');
const mockupPath = 'file:///' + path.join(__dirname, '..', 'mockup.html').replace(/\\/g, '/');

// Ensure screenshot directory exists
test.beforeAll(async () => {
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
});

test.describe('PostFinance Mockup - Original Version', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(mockupPath);
        await page.click('[data-target="original"]');
        await page.waitForTimeout(500);
    });

    test('01 - Tab Navigation sichtbar', async ({ page }) => {
        const nav = page.locator('.navigation-bar');
        await expect(nav).toBeVisible();
        await page.screenshot({
            path: path.join(screenshotDir, '01-original-tab-navigation.png'),
            fullPage: false
        });
    });

    test('02 - Original Header', async ({ page }) => {
        const header = page.locator('#original header').first();
        await header.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '02-original-header.png'),
            fullPage: false
        });
    });

    test('03 - Original Intro Sektion', async ({ page }) => {
        const intro = page.locator('#original section.intro').first();
        await intro.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '03-original-intro.png'),
            fullPage: false
        });
    });

    test('04 - Original Profile Tasks', async ({ page }) => {
        const tasks = page.locator('#original .profile-tasks');
        await tasks.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '04-original-profile-tasks.png'),
            fullPage: false
        });
    });

    test('05 - Original Benefits', async ({ page }) => {
        const benefits = page.locator('#original section.benefits');
        await benefits.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '05-original-benefits.png'),
            fullPage: false
        });
    });
});

test.describe('PostFinance Mockup - Überarbeitete Version', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(mockupPath);
        await page.click('[data-target="new"]');
        await page.waitForTimeout(500);
    });

    test('06 - Neuer Header mit Tech-Tags', async ({ page }) => {
        const header = page.locator('#new header').first();
        await header.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '06-new-header-tech-tags.png'),
            fullPage: false
        });
    });

    test('07 - Tech-Stack Sektion', async ({ page }) => {
        const section = page.locator('.tech-stack-section');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '07-new-tech-stack.png'),
            fullPage: false
        });
    });

    test('08 - Tech-Kultur Sektion', async ({ page }) => {
        const section = page.locator('.culture-section');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '08-new-tech-culture.png'),
            fullPage: false
        });
    });

    test('09 - Überarbeitete Tasks Sektion', async ({ page }) => {
        const section = page.locator('#new .profile-tasks');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '09-new-tasks.png'),
            fullPage: false
        });
    });

    test('10 - Flexibilität Sektion', async ({ page }) => {
        const section = page.locator('.flexibility-section');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '10-new-flexibility.png'),
            fullPage: false
        });
    });

    test('11 - Karrierepfad Sektion', async ({ page }) => {
        const section = page.locator('.career-section');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '11-new-career-path.png'),
            fullPage: false
        });
    });

    test('12 - Transformation Sektion', async ({ page }) => {
        const section = page.locator('.future-section');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '12-new-transformation.png'),
            fullPage: false
        });
    });

    test('13 - Gehalt Sektion', async ({ page }) => {
        const section = page.locator('#new .salary');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '13-new-salary.png'),
            fullPage: false
        });
    });

    test('14 - Benefits Sektion', async ({ page }) => {
        const section = page.locator('#new section.benefits');
        await section.scrollIntoViewIfNeeded();
        await page.screenshot({
            path: path.join(screenshotDir, '14-new-benefits.png'),
            fullPage: false
        });
    });
});

test.describe('Tab Navigation Funktionalität', () => {
    test('15 - Tab-Wechsel funktioniert', async ({ page }) => {
        await page.goto(mockupPath);

        // Start on original
        await expect(page.locator('#original')).toBeVisible();
        await expect(page.locator('#new')).not.toBeVisible();

        // Switch to new
        await page.click('[data-target="new"]');
        await page.waitForTimeout(300);

        await expect(page.locator('#new')).toBeVisible();
        await expect(page.locator('#original')).not.toBeVisible();

        await page.screenshot({
            path: path.join(screenshotDir, '15-tab-switch.png'),
            fullPage: false
        });
    });

    test('16 - Full Page Original', async ({ page }) => {
        await page.goto(mockupPath);
        await page.click('[data-target="original"]');
        await page.waitForTimeout(500);
        await page.screenshot({
            path: path.join(screenshotDir, '16-full-page-original.png'),
            fullPage: true
        });
    });

    test('17 - Full Page New', async ({ page }) => {
        await page.goto(mockupPath);
        await page.click('[data-target="new"]');
        await page.waitForTimeout(500);
        await page.screenshot({
            path: path.join(screenshotDir, '17-full-page-new.png'),
            fullPage: true
        });
    });
});
