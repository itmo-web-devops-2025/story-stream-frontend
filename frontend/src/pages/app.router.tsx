import { PathRoute } from '@/constants/core/path-route.constant'
import ArticlePage from '@/pages/article-page/article-page'
import Home from '@/pages/home/home'
import SignIn from '@/pages/sign-in/sign-in'
import SignUp from '@/pages/sign-up/sign-up'
import { Navigate, RouteObject } from 'react-router'

const createRouter = (isAuth: boolean): RouteObject[] => [
  {
    path: PathRoute.Home,
    element: <Home />
  },
  {
    path: '/sign-in',
    element: isAuth ? <Navigate to={PathRoute.Home} /> : <SignIn />
  },
  {
    path: '/sign-up',
    element: isAuth ? <Navigate to={PathRoute.Home} /> : <SignUp />
  },
  {
    path: '/articles',
    element: isAuth ? <ArticlePage /> : <SignIn />
  }
]

export default createRouter
