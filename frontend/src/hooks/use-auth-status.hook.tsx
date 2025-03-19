import { AuthStatus } from '@/enum/core/auth-status.enum'
import { apiClient } from '@/services/api/main'
import { useEffect, useState } from 'react'

export const useAuthStatus = () => {
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.PENDING)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiClient.get('/auth/me', { withCredentials: true })
        setStatus(AuthStatus.AUTHENTICATED)
      } catch {
        setStatus(AuthStatus.UNAUTHENTICATED)
      }
    }

    checkAuth()
  }, [])

  return status
}
