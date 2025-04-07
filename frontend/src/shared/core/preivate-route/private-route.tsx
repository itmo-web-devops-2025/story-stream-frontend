import { useAuth } from '@/contexts/auth.context'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import Spinner from '@/shared/core/spinner/spinner'
import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

interface PrivateRouteProps {
  redirectFor: AuthStatus
  redirectTo: string
}

const PrivateRoute = ({
  children,
  redirectFor,
  redirectTo
}: PropsWithChildren<PrivateRouteProps>) => {
  const { authStatus } = useAuth()

  if (authStatus === AuthStatus.PENDING) {
    return <Spinner />
  }

  return authStatus !== redirectFor ? children : <Navigate to={redirectTo} />
}

export default PrivateRoute
