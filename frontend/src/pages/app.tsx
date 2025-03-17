import appRouter from '@/pages/app.router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FC } from 'react'
import { RouterProvider } from 'react-router'

const queryClient = new QueryClient()

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={appRouter} />
  </QueryClientProvider>
)

export default App
