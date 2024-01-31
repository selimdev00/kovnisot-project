import { test, expect } from '@playwright/test'

const config: {
  stageId: string | null
  taskId: string | null
  stageIdTarget: string | null
} = {
  stageId: null,
  taskId: null,
  stageIdTarget: null,
}

test.beforeEach(async ({ page }) => {
  await page.goto('/kanban')

  // Creating stage
  await page.getByText('Add stage', { exact: true }).click()
  await page.getByPlaceholder('Stage name').fill('Test stage 1')
  await page.getByRole('button', { name: 'Add stage' }).click()
  config.stageId = await page
    .locator('[data-kanban-stage]')
    .getAttribute('data-kanban-stage')

  // Creating task
  await page
    .locator(`[data-kanban-stage=${config.stageId}]`)
    .getByRole('button', { name: 'Add task' })
    .click()
  await page.locator('input[name="title"]').fill('Test task')
  await page.locator('textarea[name="description"]').fill('Test description')
  await page.getByRole('button', { name: 'Add task' }).click()
  config.taskId = await page.locator('[data-task]').getAttribute('data-task')
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

test('Delete stage with rejecting', async ({ page }) => {
  await page
    .locator(`div[data-kanban-stage=${config.stageId}]`)
    .getByAltText('Delete stage')
    .click()

  await page.getByAltText('no').click()

  await expect(
    page.locator(`div[data-kanban-stage=${config.stageId}]`),
  ).toHaveCount(1)
})

test('Delete stage with confirmation', async ({ page }) => {
  await page
    .locator(`div[data-kanban-stage=${config.stageId}]`)
    .getByAltText('Delete stage')
    .click()

  await page.getByAltText('yes').click()

  await expect(
    page.locator(`div[data-kanban-stage=${config.stageId}]`),
  ).toHaveCount(0)
})

test('Add new task', async ({ page }) => {
  await expect(page.locator(`[data-task-stage=${config.stageId}]`)).toHaveCount(
    1,
  )
})

test('Edit task clicking edit icon', async ({ page }) => {
  await Promise.all([
    page
      .locator(`[data-task=${config.taskId}]`)
      .getByAltText('Edit task')
      .click(),
    page.waitForURL(`http://localhost:3000/kanban/tasks/${config.taskId}`),
  ])

  await page.locator('input[name="title"]').fill('Test task edited')

  await page
    .locator('textarea[name="description"]')
    .fill('Test description edited')

  await Promise.all([
    page.getByAltText('Save').click(),
    page.waitForURL(`http://localhost:3000/kanban`),
  ])

  await expect(page.url()).toBe(`http://localhost:3000/kanban`)

  await expect(page.locator(`[data-task=${config.taskId}] h3`)).toHaveText(
    'Test task edited',
  )

  await expect(page.locator(`[data-task=${config.taskId}] p`)).toHaveText(
    'Test description edited',
  )
})

test('Edit task clicking task item', async ({ page }) => {
  await Promise.all([
    page.locator(`[data-task=${config.taskId}]`).click(),
    page.waitForURL(`http://localhost:3000/kanban/tasks/${config.taskId}`),
  ])

  await page.locator('input[name="title"]').fill('Test task edited')

  await page
    .locator('textarea[name="description"]')
    .fill('Test description edited')

  await Promise.all([
    page.getByAltText('Save').click(),
    page.waitForURL(`http://localhost:3000/kanban`),
  ])

  await expect(page.url()).toBe(`http://localhost:3000/kanban`)

  await expect(page.locator(`[data-task=${config.taskId}] h3`)).toHaveText(
    'Test task edited',
  )

  await expect(page.locator(`[data-task=${config.taskId}] p`)).toHaveText(
    'Test description edited',
  )
})

test('Delete task with delete icon with rejection', async ({ page }) => {
  await page
    .locator(`[data-task=${config.taskId}]`)
    .getByAltText('Delete task')
    .click()

  await page.getByAltText('no').click()

  await expect(page.locator(`[data-task=${config.taskId}]`)).toHaveCount(1)
})

test('Delete task with delete icon with confirmation', async ({ page }) => {
  await page
    .locator(`[data-task=${config.taskId}]`)
    .getByAltText('Delete task')
    .click()

  await page.getByAltText('yes').click()

  await expect(page.locator(`[data-task=${config.taskId}]`)).toHaveCount(0)
})

test('Delete task within task page with rejection', async ({ page }) => {
  await Promise.all([
    page.locator(`[data-task=${config.taskId}]`).click(),
    page.waitForURL(`http://localhost:3000/kanban/tasks/${config.taskId}`),
  ])

  await page.getByRole('button', { name: 'Delete task' }).click()

  await page.getByAltText('no').click()

  await page.goto('/kanban')

  await expect(page.locator(`[data-task=${config.taskId}]`)).toHaveCount(1)
})

test('Delete task within task page with confirmation', async ({ page }) => {
  await Promise.all([
    page.locator(`[data-task=${config.taskId}]`).click(),
    page.waitForURL(`http://localhost:3000/kanban/tasks/${config.taskId}`),
  ])

  await page.getByRole('button', { name: 'Delete task' }).click()

  await Promise.all([
    page.getByAltText('yes').click(),
    page.waitForURL(`http://localhost:3000/kanban`),
  ])

  await expect(page.locator(`[data-task=${config.taskId}]`)).toHaveCount(0)
})

test("Change task's stage with select input within page", async ({ page }) => {
  // Creating target stage
  await page.getByText('Add stage', { exact: true }).click()
  await page.getByPlaceholder('Stage name').fill('Test stage 2')
  await page.getByRole('button', { name: 'Add stage' }).click()
  await page.waitForTimeout(1000)
  const stages = await page.locator('[data-kanban-stage]').all()
  config.stageIdTarget = await stages[1].getAttribute('data-kanban-stage')

  await Promise.all([
    page.locator(`[data-task=${config.taskId}]`).click(),
    page.waitForURL(`http://localhost:3000/kanban/tasks/${config.taskId}`),
  ])

  await page
    .getByPlaceholder('Select stage')
    .selectOption({ value: config.stageIdTarget as string })

  await Promise.all([
    page.getByAltText('Save').click(),
    page.waitForURL(`http://localhost:3000/kanban`),
  ])

  await expect(page.url()).toBe(`http://localhost:3000/kanban`)

  await expect(
    page
      .locator(`[data-kanban-stage=${config.stageIdTarget}]`)
      .locator(`[data-task=${config.taskId}]`),
  ).toHaveCount(1)
})

test("Change task's stage with drag and drop", async ({ page }) => {
  // Creating target stage
  await page.getByText('Add stage', { exact: true }).click()
  await page.getByPlaceholder('Stage name').fill('Test stage 2')
  await page.getByRole('button', { name: 'Add stage' }).click()
  await page.waitForTimeout(1000)
  const stages = await page.locator('[data-kanban-stage]').all()
  config.stageIdTarget = await stages[1].getAttribute('data-kanban-stage')

  const item = await page.locator(`[data-task=${config.taskId}]`)

  let dropzone = await page.locator(
    `[data-stage-dropzone=${config.stageIdTarget}]`,
  )
  await item.dragTo(dropzone)
  await expect(
    page.locator(`[data-task-stage=${config.stageIdTarget}]`),
  ).toHaveCount(1)

  dropzone = await page.locator(`[data-stage-dropzone=${config.stageId}]`)
  await item.dragTo(dropzone)
  await expect(page.locator(`[data-task-stage=${config.stageId}]`)).toHaveCount(
    1,
  )
})
