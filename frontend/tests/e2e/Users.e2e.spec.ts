import { test, expect } from '@playwright/test'
test.describe('Usuários', () => {
test('navega para Usuários e lista itens do backend', async ({ page }) => {
await page.goto('/')
await page.getByRole('link', { name: 'Usuários' }).click()
await expect(page.getByRole('heading', { name: /Usuários/i })).toBeVisible()
await expect(page.getByText(/john.doe@example.com/i)).toBeVisible()
await expect(page.getByText(/jane.smith@example.com/i)).toBeVisible()
});
});

test('cria usuário e aparece na lista', async ({ page }) => {
await page.goto('/users')
await page.getByRole('button', { name: /Adicionar Usuário/i }).click()
const uniqueEmail = `aluno.${Date.now()}@ex.com`
await page.getByLabel('Nome:').fill('Aluno E2E')
await page.getByLabel('Email:').fill(uniqueEmail)
await page.getByRole('button', { name: /Criar/i }).click()
await expect(page.getByText(uniqueEmail)).toBeVisible()
});

test.describe('Usuários - Update e Delete', () => {

  test('atualiza um usuário existente', async ({ page }) => {
    await page.goto('/users')
    await page.getByRole('button', { name: /editar/i }).first().click()
    await page.getByLabel('Nome:').fill('Usuário Editado')
    await page.getByRole('button', { name: /Salvar/i }).click()
    await expect(page.getByText('Usuário Editado')).toBeVisible()
  })

  test('exclui um usuário da lista', async ({ page }) => {
    await page.goto('/users')
    await page.getByRole('button', { name: /Excluir/i }).first().click()
    await page.getByRole('button', { name: /Confirmar/i }).click()
    await expect(page.getByText(/Usuário Editado/i)).not.toBeVisible()
  })
})