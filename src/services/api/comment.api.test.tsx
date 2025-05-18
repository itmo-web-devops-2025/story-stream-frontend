import { useCreateCommentMutation } from '@/services/api/comment.api'
import { apiClient } from '@/services/api/main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { act, JSX, ReactNode } from 'react'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
// Mock the apiClient
vi.mock('@/services/api/main', () => ({
  apiClient: {
    post: vi.fn()
  }
}))

describe('useCreateCommentMutation', () => {
  let queryClient: QueryClient
  let wrapper: ({ children }: { children: ReactNode }) => JSX.Element

  beforeEach(() => {
    // Create a new QueryClient for each test to avoid cache collisions
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    })
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    // Reset mocks
    vi.clearAllMocks()
  })

  it('should call apiClient.post with correct URL and body', async () => {
    const postId = '123'
    const body = { text: 'Test comment' }
    ;(apiClient.post as Mock).mockResolvedValue({ data: {} })

    const { result } = renderHook(() => useCreateCommentMutation(), {
      wrapper
    })

    act(() => {
      result.current.mutate({ postId, body })
    })

    await waitFor(() => result.current.isSuccess)

    expect(apiClient.post).toHaveBeenCalledWith(`/comments/${postId}`, body)
  })

  it('should invalidate queries for the post on success', async () => {
    const postId = '456'
    const body = { text: 'Another comment' }
    ;(apiClient.post as Mock).mockResolvedValue({ data: {} })

    // Spy on invalidateQueries
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')

    const { result } = renderHook(() => useCreateCommentMutation(), {
      wrapper
    })

    act(() => {
      result.current.mutate({ postId, body })
    })

    await waitFor(() => result.current.isSuccess)

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['posts', postId] })
  })

  it('should handle errors correctly', async () => {
    const postId = '789'
    const body = { text: 'Will fail' }
    const error = new Error('Network error')
    ;(apiClient.post as Mock).mockRejectedValue(error)

    const { result } = renderHook(() => useCreateCommentMutation(), {
      wrapper
    })

    act(() => {
      result.current.mutate({ postId, body })
    })

    await waitFor(() => result.current.isError)

    expect(result.current.error).toBe(error)
  })
})
