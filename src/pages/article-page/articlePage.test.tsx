import { AuthProvider } from '@/contexts/auth/auth.provider'
import { useAuth } from '@/contexts/auth/use-auth.hook'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import { useGetPost } from '@/services/api/post.api'
import { Post } from '@/types/post/post.interface'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import ArticlePage from './article-page'

// Мок хука useGetPost
vi.mock('@/services/api/post.api', () => ({
  __esModule: true,
  useGetPost: vi.fn()
}))

// Мок хука useAuth
vi.mock('@/contexts/auth/use-auth.hook', () => ({
  __esModule: true,
  useAuth: vi.fn()
}))

// Мок компонента ArticleContent
vi.mock('@/features/article/article-content/article-content', () => ({
  __esModule: true,
  default: ({ article }: { article: Post }) => (
    <div data-testid='article-content'>{article.body}</div>
  )
}))

const useGetPostMock = useGetPost as Mock
const useAuthMock = useAuth as Mock

describe('ArticlePage', () => {
  const samplePost: Post = {
    id: '123',
    title: 'Test Article Title',
    body: 'Test content',
    likes: [],
    favoritesCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    user: { id: 'u1', username: 'author' },
    comments: []
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Пользователь всегда авторизован
    useAuthMock.mockReturnValue({ authStatus: AuthStatus.AUTHENTICATED })
    // Мокаем ответ хука
    useGetPostMock.mockReturnValue({
      data: { data: samplePost },
      isLoading: false
    })
  })

  it('renders the article page with fetched post', () => {
    render(
      <MemoryRouter initialEntries={['/article/123']}>
        <AuthProvider>
          <Routes>
            <Route path='/article/:articleId' element={<ArticlePage />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    )

    // Проверяем заголовок и содержимое через ArticleContent
    expect(screen.getByText('Test Article Title')).toBeInTheDocument()
    expect(screen.getByTestId('article-content')).toHaveTextContent(
      'Test content'
    )
  })
})
