import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

test('app loads and shows main heading', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /climbing tracker/i })).toBeVisible();
});

test('user can add a new session and see it in the list', async ({ page }) => {
  // Fill date
  await page.fill('#date', '2026-06-23');

  // Select colour (first select on page)
  await page.locator('select').nth(0).selectOption('Blue');

  // Select difficulty (second select)
  await page.locator('select').nth(1).selectOption('Medium');

  // Fill climb count
  await page.fill('input[type="number"]', '5');

  // Select duration hours (third select)
  await page.locator('select').nth(2).selectOption('1');

  // Select duration minutes (fourth select)
  await page.locator('select').nth(3).selectOption('30');

  // Submit
  await page.getByRole('button', { name: /add session/i }).click();

  // Verify session appears in list
  await expect(page.getByText('2026-06-23')).toBeVisible();
  await expect(page.getByText('Blue - Medium - 5 climbs')).toBeVisible();
});

test('user can delete a session', async ({ page }) => {
  // Add a session first
  await page.fill('#date', '2026-06-22');
  await page.locator('select').nth(0).selectOption('Pink');
  await page.locator('select').nth(1).selectOption('Easy');
  await page.fill('input[type="number"]', '3');
  await page.locator('select').nth(2).selectOption('1');
  await page.locator('select').nth(3).selectOption('00');
  await page.getByRole('button', { name: /add session/i }).click();

  // Verify it appeared
  await expect(page.getByText('2026-06-22')).toBeVisible();

  // Delete it
  await page.getByRole('button', { name: /delete/i }).first().click();

  // Verify it's gone
  await expect(page.getByText('2026-06-22')).not.toBeVisible();
});
