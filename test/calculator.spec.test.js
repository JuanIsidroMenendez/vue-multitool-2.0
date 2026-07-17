import { test, expect } from '@playwright/test'

test('suma dos números y muestra el resultado', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: '7' }).click()
  await page.getByRole('button', { name: '+', exact: true }).click()
  await page.getByRole('button', { name: '3' }).click()
  await page.getByRole('button', { name: '=' }).click()

  await expect(page.locator('.display')).toHaveText('10')
})