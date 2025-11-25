import { test, expect } from '@playwright/test'

test.describe('Categorias - CRUD', () => {

  test('lista categorias', async ({ page }) => {
    await page.goto('/categories')
    await expect(page.getByRole('heading', { name: /Categorias/i })).toBeVisible()
    await expect(page.getByText(/Work/i)).toBeVisible()
    await expect(page.getByText(/Personal/i)).toBeVisible()
  })

  test('cria categoria', async ({ page }) => {
    await page.goto('/categories')
    await page.getByRole('button', { name: /Adicionar Categoria/i }).click()
    const unique = `Categoria ${Date.now()}`
    await page.getByLabel('Nome:').fill(unique)
    await page.getByLabel('Descrição:').fill('Criada via E2E')
    await page.getByRole('button', { name: /Criar/i }).click()
    await expect(page.getByText(unique)).toBeVisible()
  })

  test('atualiza categoria', async ({ page }) => {
    await page.goto('/categories')
    await page.getByRole('button', { name: /Editar/i }).first().click()
    await page.getByLabel('Nome:').fill('Categoria Atualizada')
    await page.getByRole('button', { name: /Salvar/i }).click()
    await expect(page.getByText('Categoria Atualizada')).toBeVisible()
  })

  test('exclui categoria', async ({ page }) => {
    await page.goto('/categories')
    await page.getByRole('button', { name: /Excluir/i }).first().click()
    await page.getByRole('button', { name: /Confirmar/i }).click()
    await expect(page.getByText(/Categoria Atualizada/)).not.toBeVisible()
  })

})
