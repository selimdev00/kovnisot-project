import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test
  await page.goto('/')

  // Creating stage
  await page.getByText('Add stage', { exact: true }).click()
  await expect(await page.textContent('h3')).toBe('Add stage')
  await page.getByPlaceholder('Stage name').fill('Test stage 1')
  await page.getByRole('button', { name: 'Add stage' }).click()
})

test('Main page loads', async ({ page }) => {
  const text = await page.textContent('h1')
  expect(text).toBe(' Kanban System ')
})

test('Add new stage', async ({ page }) => {
  await expect(page.locator('input[name="stageTitle"]')).toHaveValue(
    'Test stage 1',
  )
})

test('Edit stage title', async ({ page }) => {
  const titleInput = page.locator('input[name="stageTitle"]')
  await titleInput.focus()
  await titleInput.fill('Test stage 1 edited')
  await titleInput.blur()
  await expect(page.locator('input[name="stageTitle"]')).toHaveValue(
    'Test stage 1 edited',
  )
})
