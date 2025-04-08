import { PathRoute } from '@/constants/core/path-route.constant'
import ArticlePage from '@/pages/article-page/article-page'
import Home from '@/pages/home/home'
import SignIn from '@/pages/sign-in/sign-in'
import SignUp from '@/pages/sign-up/sign-up'
import { createBrowserRouter, RouteObject } from 'react-router'

const router: RouteObject[] = [
  {
    path: PathRoute.Home,
    element: <Home />
  },
  {
    path: '/sign-in',
    element: <SignIn />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },
  {
    path: '/articles',
    element: <ArticlePage />
  }
]

const appRouter = createBrowserRouter(router)

export default appRouter
