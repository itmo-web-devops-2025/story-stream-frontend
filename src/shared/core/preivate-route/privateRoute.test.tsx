import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PrivateRoute from './private-route.tsx'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import { useAuth } from '@/contexts/auth/use-auth.hook'
import { MemoryRouter, Route, Routes } from 'react-router'
import React from 'react'

vi.mock('@/contexts/auth/use-auth.hook')

describe('PrivateRoute', () => {
  const useAuthMock = useAuth as vi.Mock

  function renderWithRouter(ui: React.ReactNode) {
    return render(<MemoryRouter>{ui}</MemoryRouter>)
  }

  it('renders Spinner when authStatus is PENDING', () => {
    useAuthMock.mockReturnValue({ authStatus: AuthStatus.PENDING })

    renderWithRouter(
      <PrivateRoute redirectFor={AuthStatus.UNAUTHORIZED} redirectTo='/login'>
        <div>Protected content</div>
      </PrivateRoute>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('renders children when authStatus is not redirectFor', () => {
    useAuthMock.mockReturnValue({ authStatus: AuthStatus.AUTHORIZED })

    renderWithRouter(
      <PrivateRoute redirectFor={AuthStatus.UNAUTHORIZED} redirectTo='/login'>
        <div>Protected content</div>
      </PrivateRoute>
    )

    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })

  it('redirects to redirectTo when authStatus matches redirectFor', () => {
    useAuthMock.mockReturnValue({ authStatus: AuthStatus.UNAUTHORIZED })

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path='/protected'
            element={
              <PrivateRoute
                redirectFor={AuthStatus.UNAUTHORIZED}
                redirectTo='/login'
              >
                <div>Protected content</div>
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Login page')).toBeInTheDocument()
  })
})
