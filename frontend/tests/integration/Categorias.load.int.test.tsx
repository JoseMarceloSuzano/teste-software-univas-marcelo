import { render, screen, waitFor } from '@testing-library/react'
import Categories from '../../src/components/Categories'
import { server, apiGet, json } from '../setup'

describe('Categories integration - carga de lista', () => {
  it('renderiza categorias retornadas pela API', async () => {
    // simula resposta da API
    server.use(
      apiGet('/categories', (_req) =>
        json({
          data: [
            {
              id: '1',
              name: 'Trabalho',
              description: 'Tarefas relacionadas ao trabalho',
              createdAt: new Date().toISOString(),
              tasks: [{ id: 't1', title: 'Relatório', user: { id: 'u1', name: 'Ana' } }],
            },
            {
              id: '2',
              name: 'Pessoal',
              description: 'Tarefas pessoais',
              createdAt: new Date().toISOString(),
              tasks: [],
            },
          ],
        })
      )
    )

    render(<Categories />)

    await waitFor(() => {
      expect(screen.getByText('Trabalho')).toBeInTheDocument()
      expect(screen.getByText('Pessoal')).toBeInTheDocument()
      expect(screen.getByText('Tarefas relacionadas ao trabalho')).toBeInTheDocument()
      expect(screen.getByText('Tarefas pessoais')).toBeInTheDocument()
    })
  })
})
