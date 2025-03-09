import Home from '@/pages/home/home'
import { createBrowserRouter, RouteObject } from 'react-router'

const router: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  }
]

const appRouter = createBrowserRouter(router)

export default appRouter
