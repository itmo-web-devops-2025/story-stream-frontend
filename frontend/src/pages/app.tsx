import appRouter from '@/pages/app.router'
import type { FC } from 'react'
import { RouterProvider } from 'react-router'

const App: FC = () => <RouterProvider router={appRouter} />

export default App
