import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './home'
import { AuthStatus } from '@/enum/core/auth-status.enum'

// Мокаем useAuth и useGetUser
vi.mock('@/contexts/auth/use-auth.hook', () => ({
  useAuth: vi.fn()
}))
vi.mock('@/services/api/user.api', () => ({
  useGetUser: vi.fn()
}))

// Мокаем ArticleList, чтобы не влезать в реализацию и запросы
vi.mock('@/features/article/article-list/article-list', () => ({
  default: () => <div>Mocked ArticleList</div>
}))

import { useAuth } from '@/contexts/auth/use-auth.hook'
import { useGetUser } from '@/services/api/user.api'

describe('Home component', () => {
  const createQueryClient = () =>
    new QueryClient({
      defaultOptions: { queries: { retry: false } }
    })

  it('renders without crashing', () => {
    ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      user: null,
      authStatus: AuthStatus.UNAUTHENTICATED
    })
    ;(useGetUser as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null
    })

    const queryClient = createQueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Mocked ArticleList')).toBeInTheDocument()
  })

  it('renders user info header when authenticated', () => {
    const mockUser = { id: '123', username: 'testuser' }
    ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      user: mockUser,
      authStatus: AuthStatus.AUTHENTICATED
    })
    ;(useGetUser as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { data: { bio: 'Test bio' } }
    })

    const queryClient = createQueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('Test bio')).toBeInTheDocument()
    expect(screen.getByText('Mocked ArticleList')).toBeInTheDocument()
  })

  it('does not render user info header when not authenticated', () => {
    ;(useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      user: null,
      authStatus: AuthStatus.UNAUTHENTICATED
    })
    ;(useGetUser as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null
    })

    const queryClient = createQueryClient()

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.queryByText(/testuser/i)).not.toBeInTheDocument()
    expect(screen.getByText('Mocked ArticleList')).toBeInTheDocument()
  })
})
