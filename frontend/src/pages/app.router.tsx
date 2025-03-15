import Home from '@/pages/home/home'
import SignIn from '@/pages/sign-in/sign-in'
import { createBrowserRouter, RouteObject } from 'react-router'

const router: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/sign-in',
    element: <SignIn />
  }
]

const appRouter = createBrowserRouter(router)

export default appRouter
