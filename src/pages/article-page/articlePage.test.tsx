import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router'

import ArticlePage from './article-page.tsx'
import { AuthProvider } from '../../contexts/auth/auth.provider.tsx' // поправь путь, если другой

// Мок для useGetPost
vi.mock('@/services/api/post.api', () => ({
  useGetPost: (articleId: string) => ({
    data: {
      data: {
        id: articleId,
        title: 'Test Article Title',
        content: 'Test content'
      }
    }
  })
}))

// Мок для ArticleContent
vi.mock('@/features/article/article-content/article-content', () => ({
  __esModule: true,
  default: ({ article }: { article: any }) => (
    <div data-testid='article-content'>{article?.content}</div>
  )
}))

describe('ArticlePage', () => {
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

    expect(screen.getByText('Test Article Title')).toBeDefined()
    expect(screen.getByTestId('article-content')).toHaveTextContent(
      'Test content'
    )
  })
})
