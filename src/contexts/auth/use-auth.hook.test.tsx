import { AuthContextType } from '@/contexts/auth/auth.type'
import { useAuth } from '@/contexts/auth/use-auth.hook'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import { renderHook } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { AuthContext } from './auth.context'

// Create a dummy AuthContext value
const mockContext: AuthContextType = {
  token: 'test-token',
  authStatus: AuthStatus.AUTHENTICATED,
  user: { id: 'u1', username: 'testuser' },
  login: vi.fn(),
  logout: vi.fn()
}

describe('useAuth hook', () => {
  it('returns context when used inside AuthProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={mockContext}>
        {children}
      </AuthContext.Provider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current).toBe(mockContext)
  })
})
