import { AuthProvider } from '@/contexts/auth/auth.context'
import appRouter from '@/pages/app.router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, StrictMode } from 'react'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router'

const queryClient = new QueryClient()

const App: FC = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
)

export default App
