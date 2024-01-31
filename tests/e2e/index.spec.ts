import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('Main page loads', async ({ page }) => {
  const text = await page.textContent('h1')
  expect(text).toBe('Welcome, recruiter or whoever you are')
})

test('Kanban page loads', async ({ page }) => {
  await page.goto('/kanban')
  expect(page.url()).toBe('http://localhost:3000/kanban')
  expect(await page.textContent('h1')).toBe(' Kanban System ')
})

test('Chart page loads', async ({ page }) => {
  await page.goto('/chart')
  expect(page.url()).toBe('http://localhost:3000/chart')
})
