import { PathRoute } from '@/constants/core/path-route.constant'
import { useAuth } from '@/contexts/auth/use-auth.hook'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import type { Post } from '@/types/post/post.interface'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Articles from './articles'

vi.mock('@/contexts/auth/use-auth.hook', () => ({
  __esModule: true,
  useAuth: vi.fn()
}))

const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: false } }
})
const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>
  )

export const mockMutateAsync = vi.fn().mockResolvedValue(undefined)

beforeEach(() => {
  vi.mocked(useAuth).mockReturnValue({
    authStatus: AuthStatus.AUTHENTICATED,
    token: 'some-token',
    user: { id: 'u1', username: 'user1' },
    login: vi.fn(),
    logout: vi.fn()
  })
})

describe('Articles.Item', () => {
  const baseArticle: Post = {
    id: '123',
    title: 'Test Title',
    body: 'Article body',
    likes: [],
    favoritesCount: 0,
    createdAt: new Date('2025-05-18T00:00:00Z'),
    updatedAt: new Date(),
    deletedAt: new Date(),
    user: { id: 'u1', username: 'user1' },
    comments: []
  }

  it('renders title with correct link', () => {
    renderWithProviders(<Articles.Item article={baseArticle} />)
    const link = screen.getByRole('link', { name: 'Test Title' })
    expect(link).toHaveAttribute(
      'href',
      `${PathRoute.Articles}/${baseArticle.id}`
    )
  })

  it('displays body text and formatted date with username', () => {
    renderWithProviders(<Articles.Item article={baseArticle} />)
    expect(screen.getByText('Article body')).toBeInTheDocument()
    expect(screen.getByText('18 May, 2025, user1')).toBeInTheDocument()
  })

  it('does not fill heart if current user did not like the post', () => {
    const otherLikeArticle = {
      ...baseArticle,
      likes: [{ id: 'l1', user: { id: 'u2', username: 'user2' } }]
    }
    renderWithProviders(<Articles.Item article={otherLikeArticle} />)
    const heartSvg = screen.getByTestId('heart-svg')
    // находим <path> внутри SVG
    const path = heartSvg.querySelector('path')
    expect(path).toBeInTheDocument()
    // ожидаем, что цвет заливки — не красный, а граница (hex-код из не-заполненного состояния)
    expect(path).toHaveAttribute('fill', '#343C54')
  })
})

describe('Articles.List and Articles wrapper', () => {
  it('renders list wrapper correctly', () => {
    render(
      <Articles.List>
        <li>Item1</li>
        <li>Item2</li>
      </Articles.List>
    )
    const list = screen.getByRole('list')
    expect(list.children).toHaveLength(2)
  })

  it('renders Articles container with children', () => {
    render(
      <Articles>
        <div>Child Content</div>
      </Articles>
    )
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })
})
