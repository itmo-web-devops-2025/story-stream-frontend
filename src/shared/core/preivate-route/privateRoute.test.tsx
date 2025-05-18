import { useAuth } from '@/contexts/auth/use-auth.hook'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, Mock, vi } from 'vitest'
import PrivateRoute from './private-route.tsx'

vi.mock('@/contexts/auth/use-auth.hook')

describe('PrivateRoute', () => {
  const useAuthMock = useAuth as Mock

  function renderWithRouter(ui: React.ReactNode) {
    return render(<MemoryRouter>{ui}</MemoryRouter>)
  }

  it('renders Spinner when authStatus is PENDING', () => {
    useAuthMock.mockReturnValue({ authStatus: AuthStatus.PENDING })

    renderWithRouter(
      <PrivateRoute redirectFor={AuthStatus.PENDING} redirectTo='/login'>
        <div>Protected content</div>
      </PrivateRoute>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('renders children when authStatus is not redirectFor', () => {
    useAuthMock.mockReturnValue({ authStatus: AuthStatus.AUTHENTICATED })

    renderWithRouter(
      <PrivateRoute redirectFor={AuthStatus.PENDING} redirectTo='/login'>
        <div>Protected content</div>
      </PrivateRoute>
    )

    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })
})
