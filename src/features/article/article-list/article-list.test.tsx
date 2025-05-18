import { AuthContext } from '@/contexts/auth/auth.context'
import { AuthContextType } from '@/contexts/auth/auth.type'
import { useAuth } from '@/contexts/auth/use-auth.hook'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import ArticleList from '@/features/article/article-list/article-list'
import { AsideProps } from '@/features/article/article-list/components/articles/components/aside/aside'
import { useGetPosts } from '@/services/api/post.api'
import { Post } from '@/types/post/post.interface'
import { User } from '@/types/user/user.interface'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'

const author: User = { id: 'user1', username: 'john' }

vi.mock('@/services/api/post.api', async () => {
  // импортируем оригинал
  const actual = await vi.importActual<
    typeof import('@/services/api/post.api')
  >('@/services/api/post.api')
  return {
    __esModule: true,
    ...actual,
    // перезаписываем только нужный нам хук
    useGetPosts: vi.fn()
  }
})

vi.mock('@/contexts/auth/use-auth.hook', () => ({
  __esModule: true,
  useAuth: vi.fn()
}))

const useGetMockPosts = useGetPosts as Mock
const useAuthMock = useAuth as Mock

const sampleArticle: Post = {
  id: 'post1',
  title: 'Test Title 1',
  body: 'Sample body',
  likes: [],
  favoritesCount: 0,
  createdAt: new Date('2025-05-01T00:00:00Z'),
  updatedAt: new Date('2025-05-02T00:00:00Z'),
  deletedAt: new Date('1970-01-01T00:00:00Z'),
  user: author,
  comments: []
}

const sampleArticleTwo: Post = {
  id: 'post2',
  title: 'Test Title 2',
  body: 'Sample body',
  likes: [],
  favoritesCount: 0,
  createdAt: new Date('2025-05-01T00:00:00Z'),
  updatedAt: new Date('2025-05-02T00:00:00Z'),
  deletedAt: new Date('1970-01-01T00:00:00Z'),
  user: author,
  comments: []
}

const mockContext: AuthContextType = {
  token: 'test-token',
  authStatus: AuthStatus.AUTHENTICATED,
  user: { id: 'u1', username: 'testuser' },
  login: vi.fn(),
  logout: vi.fn()
}

const queryClient = new QueryClient()
const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={mockContext}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  </MemoryRouter>
)

const onPageChangeMock = vi.fn()

vi.mock(
  '@/features/article/article-list/components/articles/components/aside/aside',
  () => ({
    __esModule: true,
    default: ({ posts, paginationProps }: AsideProps) => {
      // Перебиваем реальный колбек на нашу заглушку
      const props = { ...paginationProps, onPageChange: onPageChangeMock }
      return (
        <div data-testid='aside'>
          Aside - {posts?.length} posts
          <button data-testid='page-btn' onClick={() => props.onPageChange(2)}>
            Next
          </button>
        </div>
      )
    }
  })
)

describe('ArticleList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows spinner when loading', () => {
    useAuthMock.mockReturnValue({ authStatus: AuthStatus.AUTHENTICATED })
    useGetMockPosts.mockReturnValue({
      data: undefined,
      isLoading: true
    })

    render(<ArticleList />, { wrapper })
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('renders add button for authenticated users', () => {
    useAuthMock.mockReturnValue({ authStatus: AuthStatus.AUTHENTICATED })

    useGetMockPosts.mockReturnValue({
      data: {
        data: {
          posts: [],
          meta: { total: 0, pageSize: 10 }
        }
      },
      isLoading: false
    })
    render(<ArticleList />, { wrapper })
    const addButton = screen.getByTestId('add-button')
    expect(addButton).toBeInTheDocument()
    expect(addButton).toHaveTextContent('Добавить статью')
  })

  it('does not render add button for unauthenticated users', () => {
    ;(useAuth as Mock).mockReturnValue({
      authStatus: AuthStatus.UNAUTHENTICATED
    })
    ;(useGetPosts as Mock).mockReturnValue({
      data: {
        data: {
          posts: [],
          meta: { total: 0, pageSize: 10 }
        }
      },
      isLoading: false
    })

    render(<ArticleList />, { wrapper })
    expect(screen.queryByTestId('add-button')).toBeNull()
  })

  it('changes page on aside button click', () => {
    ;(useAuth as Mock).mockReturnValue({
      authStatus: AuthStatus.AUTHENTICATED
    })
    ;(useGetPosts as Mock).mockReturnValue({
      data: {
        data: {
          posts: [sampleArticle, sampleArticleTwo],
          meta: { total: 1, pageSize: 10 }
        }
      },
      isLoading: false
    })

    render(<ArticleList />, { wrapper })
    const nextButton = screen.getByTestId('page-btn')
    fireEvent.click(nextButton)
    expect(nextButton).toBeInTheDocument()
  })
})
