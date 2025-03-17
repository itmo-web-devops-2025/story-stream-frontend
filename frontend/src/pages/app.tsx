import appRouter from '@/pages/app.router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, StrictMode } from 'react'
import { RouterProvider } from 'react-router'

const queryClient = new QueryClient()

const App: FC = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  </StrictMode>
)

export default App
