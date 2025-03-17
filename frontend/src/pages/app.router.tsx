import Home from '@/pages/home/home'
import SignIn from '@/pages/sign-in/sign-in'
import SignUp from '@/pages/sign-up/sign-up'
import { createBrowserRouter, RouteObject } from 'react-router'

const router: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/sign-in',
    element: <SignIn />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  }
]

const appRouter = createBrowserRouter(router)

export default appRouter
