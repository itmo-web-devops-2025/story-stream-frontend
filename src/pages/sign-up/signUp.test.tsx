import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SignUp from './sign-up.tsx'
import { AuthProvider } from '@/contexts/auth/auth.provider'
import { MemoryRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

describe('SignUp', () => {
  it('renders the page with correct title and components', () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </AuthProvider>
      </QueryClientProvider>
    )

    // Проверяем заголовок
    const heading = screen.getByRole('heading', { name: 'Регистрация' })
    expect(heading).toBeDefined()

    // Проверяем, что футер (contentinfo) есть, если footer — семантический тег
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeDefined()
  })
})
