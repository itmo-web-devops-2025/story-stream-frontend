import { ACCESS_TOKEN } from '@/constants/core/local-storage-keys.constant'
import { AuthContext } from '@/contexts/auth/auth.context'
import { AuthProvider } from '@/contexts/auth/auth.provider'
import { AuthContextType } from '@/contexts/auth/auth.type'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage
} from '@/utils/local-storage.util'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import { jwtDecode } from 'jwt-decode'
import React, { act } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock localStorage util functions
vi.mock('@/utils/local-storage.util', () => ({
  __esModule: true,
  getFromLocalStorage: vi.fn(),
  saveToLocalStorage: vi.fn(),
  removeFromLocalStorage: vi.fn()
}))
// Mock jwt-decode to control decoded payload
vi.mock('jwt-decode', () => ({
  __esModule: true,
  jwtDecode: vi.fn()
}))

// React Query wrapper
const queryClient = new QueryClient()
const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('<AuthProvider />', () => {
  const mockGet = vi.mocked(getFromLocalStorage)
  const mockSave = vi.mocked(saveToLocalStorage)
  const mockRemove = vi.mocked(removeFromLocalStorage)
  const mockDecode = vi.mocked(jwtDecode)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const Consumer: React.FC = () => {
    const ctx = React.useContext(AuthContext)!
    return <div data-testid='status'>{ctx.authStatus}</div>
  }

  it('defaults to UNAUTHENTICATED when no token', async () => {
    mockGet.mockReturnValue(null)
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
      { wrapper }
    )
    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe(
        AuthStatus.UNAUTHENTICATED
      )
    })
    expect(mockGet).toHaveBeenCalledWith(ACCESS_TOKEN)
  })

  it('authenticates when token present', async () => {
    const fakeToken = 'token123'
    const fakePayload = { id: 'u1', username: 'alice' }
    mockGet.mockReturnValue(fakeToken)
    mockDecode.mockReturnValue(fakePayload)

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
      { wrapper }
    )
    await waitFor(() => {
      expect(screen.getByTestId('status').textContent).toBe(
        AuthStatus.AUTHENTICATED
      )
    })
    expect(mockDecode).toHaveBeenCalledWith(fakeToken)
  })

  it('login and logout modify context correctly', () => {
    let context!: AuthContextType
    const Capture: React.FC = () => {
      context = React.useContext(AuthContext)!
      return null
    }
    render(
      <AuthProvider>
        <Capture />
      </AuthProvider>,
      { wrapper }
    )

    // login
    const loginToken = 'logintoken'
    const loginPayload = { id: 'u2', username: 'bob' }
    mockDecode.mockReturnValue(loginPayload)
    act(() => {
      context.login(loginToken)
    })
    expect(mockSave).toHaveBeenCalledWith(ACCESS_TOKEN, loginToken)
    expect(context.authStatus).toBe(AuthStatus.AUTHENTICATED)
    expect(context.user).toEqual(loginPayload)

    // logout
    act(() => {
      context.logout()
    })
    expect(mockRemove).toHaveBeenCalledWith(ACCESS_TOKEN)
    expect(context.authStatus).toBe(AuthStatus.UNAUTHENTICATED)
    expect(context.token).toBeNull()
  })
})
