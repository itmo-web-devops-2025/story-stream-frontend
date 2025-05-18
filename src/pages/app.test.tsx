import App from '@/pages/app'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { RouterProviderProps } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/contexts/auth/auth.provider', () => ({
  __esModule: true,
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='auth-provider'>{children}</div>
  )
}))

vi.mock('@tanstack/react-query', async () => {
  const actual: typeof import('@tanstack/react-query') = await vi.importActual(
    '@tanstack/react-query'
  )
  return {
    __esModule: true,
    ...actual,
    QueryClientProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid='query-client-provider'>{children}</div>
    )
  }
})

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  Toaster: () => <div data-testid='toaster' />
}))

vi.mock('react-router', () => ({
  __esModule: true,
  RouterProvider: ({ router }: RouterProviderProps) => (
    <div data-testid='router-provider' data-router={JSON.stringify(router)} />
  )
}))
vi.mock('@/pages/app.router', () => ({
  __esModule: true,
  default: { routes: ['dummy'] }
}))

describe('<App />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders AuthProvider, QueryClientProvider, RouterProvider and Toaster', () => {
    render(<App />)
    expect(screen.getByTestId('auth-provider')).toBeInTheDocument()
    expect(screen.getByTestId('query-client-provider')).toBeInTheDocument()
    expect(screen.getByTestId('router-provider')).toBeInTheDocument()
    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })
})
