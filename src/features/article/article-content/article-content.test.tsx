import { useAuth } from '@/contexts/auth/use-auth.hook'
import { AuthStatus } from '@/enum/core/auth-status.enum'

import ArticleContent from '@/features/article/article-content/article-content'
import { Post } from '@/types/post/post.interface'
import { User } from '@/types/user/user.interface'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, MockedFunction, vi } from 'vitest'

vi.mock('@/contexts/auth/use-auth.hook', () => ({
  __esModule: true,
  useAuth: vi.fn()
}))
// Stub out child components
vi.mock('@/features/article/article-tools/article-tools', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  )
}))
vi.mock('@/shared/ui/button-icon/button-icon', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  )
}))
vi.mock('@/shared/widgets/modal/modal', () => ({
  __esModule: true,
  default: ({
    open,
    children
  }: {
    open: boolean
    children: React.ReactNode
  }) => (open ? <div>{children}</div> : null)
}))
vi.mock('@/features/article/form-article/form-article', () => ({
  __esModule: true,
  default: () => <div />
}))

const mockUseAuth = useAuth as unknown as MockedFunction<typeof useAuth>

// Create a wrapper that provides React Query context
const queryClient = new QueryClient()
const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('<ArticleContent /> snapshots', () => {
  const author: User = { id: 'user1', username: 'john' }
  const otherUser: User = { id: 'user2', username: 'jane' }

  const baseAuthContext = {
    token: null as string | null,
    login: vi.fn() as () => void,
    logout: vi.fn() as () => void
  }

  const sampleArticle: Post = {
    id: 'post1',
    title: 'Test Title',
    body: 'Sample body',
    likes: [],
    favoritesCount: 0,
    createdAt: new Date('2025-05-01T00:00:00Z'),
    updatedAt: new Date('2025-05-02T00:00:00Z'),
    deletedAt: new Date('1970-01-01T00:00:00Z'),
    user: author,
    comments: []
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing when no article', () => {
    mockUseAuth.mockReturnValue({
      ...baseAuthContext,
      authStatus: AuthStatus.PENDING,
      user: null
    })
    const { container } = render(<ArticleContent />, { wrapper })
    expect(container).toMatchSnapshot()
  })

  it('renders article for authenticated author', () => {
    mockUseAuth.mockReturnValue({
      ...baseAuthContext,
      authStatus: AuthStatus.AUTHENTICATED,
      user: author
    })
    const { container } = render(<ArticleContent article={sampleArticle} />, {
      wrapper
    })
    expect(container).toMatchSnapshot()
  })

  it('renders article without controls for non-author', () => {
    mockUseAuth.mockReturnValue({
      ...baseAuthContext,
      authStatus: AuthStatus.AUTHENTICATED,
      user: otherUser
    })
    const { container } = render(<ArticleContent article={sampleArticle} />, {
      wrapper
    })
    expect(container).toMatchSnapshot()
  })
})
