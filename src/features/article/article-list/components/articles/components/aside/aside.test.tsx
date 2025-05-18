import { PathRoute } from '@/constants/core/path-route.constant'
import type { Post } from '@/types/post/post.interface'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Aside from './aside'

describe('Aside component', () => {
  // Create minimal valid Post objects for testing
  const samplePosts: Post[] = [
    {
      id: '1',
      title: 'First Post',
      body: 'Foo',
      likes: [],
      favoritesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      user: { id: 'u1', username: 'user1' },
      comments: []
    },
    {
      id: '2',
      title: 'Second Post',
      body: 'Bar',
      likes: [],
      favoritesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      user: { id: 'u2', username: 'user2' },
      comments: []
    },
    {
      id: '3',
      title: 'Third Post',
      body: 'Baz',
      likes: [],
      favoritesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      user: { id: 'u3', username: 'user3' },
      comments: []
    }
  ]

  it('renders without posts and without paginationProps', () => {
    render(<Aside />)
    const aside = screen.getByLabelText('Оглавление')
    expect(aside).toBeInTheDocument()
    expect(screen.queryByTestId('pagination-mock')).toBeNull()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('renders a list of posts with correct links', () => {
    render(<Aside posts={samplePosts} />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(samplePosts.length)

    samplePosts.forEach((post) => {
      const link = screen.getByText(post.title)
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', `${PathRoute.Articles}/${post.id}`)
    })
  })

  it('has correct aria-label on the aside element', () => {
    render(<Aside posts={samplePosts} />)
    const aside = screen.getByLabelText('Оглавление')
    expect(aside.tagName.toLowerCase()).toBe('aside')
  })
})
