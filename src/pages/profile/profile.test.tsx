import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Profile from './profile.tsx'
import { AuthProvider } from '@/contexts/auth/auth.provider'
import { MemoryRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

describe('Profile', () => {
  it('renders page header and ProfileSetting component', () => {
    const queryClient = new QueryClient()

    render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Profile />
          </MemoryRouter>
        </QueryClientProvider>
      </AuthProvider>
    )

    expect(screen.getByText('Настройки пользователя')).toBeInTheDocument()
  })
})
