import { useAuth } from '@/contexts/auth.context'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import createRouter from '@/pages/app.router'
import { FC } from 'react'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router'

const App: FC = () => {
  const { authStatus } = useAuth()
  console.log('authStatus', authStatus)
  const appRouter = createBrowserRouter(
    createRouter(authStatus === AuthStatus.AUTHENTICATED)
  )

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  )
}

export default App
