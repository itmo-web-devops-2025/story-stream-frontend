import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SignIn from './sign-in.tsx'
import { AuthProvider } from '@/contexts/auth/auth.provider' // поправьте путь
import { MemoryRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

describe('SignIn', () => {
  it('renders the page with correct title and components', () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </AuthProvider>
      </QueryClientProvider>
    )

    expect(screen.getByText('Авторизация')).toBeDefined()
    expect(screen.getByRole('contentinfo')).toBeDefined()
  })
})
