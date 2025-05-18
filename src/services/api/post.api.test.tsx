import { apiClient } from '@/services/api/main'
import { Post } from '@/types/post/post.interface'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { act, PropsWithChildren } from 'react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPost,
  useGetPosts,
  useLikePostMutation,
  useUpdatePostMutation
} from './post.api'

const sampleArticle: Post = {
  id: 'post1',
  title: 'Test Title',
  body: 'Sample body',
  likes: [],
  favoritesCount: 0,
  createdAt: new Date('2025-05-01T00:00:00Z'),
  updatedAt: new Date('2025-05-02T00:00:00Z'),
  deletedAt: new Date('1970-01-01T00:00:00Z'),
  user: { id: 'user1', username: 'john' },
  comments: []
}

// Mock apiClient methods
vi.mock('@/services/api/main', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn()
  }
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
})
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('post.api hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useGetPosts calls apiClient.get with correct URL', async () => {
    ;(apiClient.get as Mock).mockResolvedValue({
      data: {
        posts: [],
        meta: { total: 0, pageSize: 5 }
      }
    })
    const { result } = renderHook(
      () =>
        useGetPosts({
          query: {
            page: 2,
            size: 5
          }
        }),
      { wrapper }
    )

    await waitFor(() => result.current.isSuccess)
    expect(apiClient.get).toHaveBeenCalledWith('/posts?page=2&size=5')
  })

  it('useGetPost enabled only when id defined', async () => {
    ;(apiClient.get as Mock).mockResolvedValue({
      data: {
        id: '1',
        title: 'x'
      }
    })
    // id undefined: disabled
    const { result: r1 } = renderHook(() => useGetPost(undefined), {
      wrapper
    })
    expect(r1.current.isFetching).toBe(false)

    // id defined
    const { result: r2 } = renderHook(() => useGetPost('123'), {
      wrapper
    })
    await waitFor(() => r2.current.isSuccess)
    expect(apiClient.get).toHaveBeenCalledWith('/posts/123')
  })

  it('useCreatePostMutation calls post and invalidates queries', async () => {
    ;(apiClient.post as Mock).mockResolvedValue({})
    const invalidate = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useCreatePostMutation(), {
      wrapper
    })

    act(() => {
      result.current.mutate({ body: { title: 'new', body: 'content' } })
    })
    await waitFor(() => result.current.isSuccess)
    expect(apiClient.post).toHaveBeenCalledWith('/posts', {
      title: 'new',
      body: 'content'
    })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['posts'] })
  })

  it('useUpdatePostMutation calls patch and invalidates queries', async () => {
    ;(apiClient.patch as Mock).mockResolvedValue({})
    const invalidate = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useUpdatePostMutation(), {
      wrapper
    })

    act(() => {
      result.current.mutate({ postId: '1', body: sampleArticle })
    })
    await waitFor(() => result.current.isSuccess)
    expect(apiClient.patch).toHaveBeenCalledWith('/posts/1', sampleArticle)
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['posts', '1'] })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['posts'] })
  })

  it('useDeletePostMutation calls delete and invalidates', async () => {
    ;(apiClient.delete as Mock).mockResolvedValue({})
    const invalidate = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useDeletePostMutation(), {
      wrapper
    })

    act(() => {
      result.current.mutate({ postId: '2' })
    })
    await waitFor(() => result.current.isSuccess)
    expect(apiClient.delete).toHaveBeenCalledWith('/posts/2')
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['posts', '2'] })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['posts'] })
  })

  it('useLikePostMutation calls patch and invalidates', async () => {
    ;(apiClient.patch as Mock).mockResolvedValue({})
    const invalidate = vi.spyOn(queryClient, 'invalidateQueries')
    const { result } = renderHook(() => useLikePostMutation(), {
      wrapper
    })

    act(() => {
      result.current.mutate({ postId: '3' })
    })
    await waitFor(() => result.current.isSuccess)
    expect(apiClient.patch).toHaveBeenCalledWith('/posts/3/like')
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['posts', '3'] })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['posts'] })
  })
})
