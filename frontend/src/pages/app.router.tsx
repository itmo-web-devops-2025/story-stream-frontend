import { PathRoute } from '@/constants/core/path-route.constant'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import ArticlePage from '@/pages/article-page/article-page'
import Home from '@/pages/home/home'
import Profile from '@/pages/profile/profile'
import SignIn from '@/pages/sign-in/sign-in'
import SignUp from '@/pages/sign-up/sign-up'
import PrivateRoute from '@/shared/core/preivate-route/private-route'
import { createBrowserRouter, RouteObject } from 'react-router'

const router: RouteObject[] = [
  {
    path: PathRoute.Home,
    element: <Home />
  },
  {
    path: PathRoute.SignIn,
    element: (
      <PrivateRoute
        redirectFor={AuthStatus.AUTHENTICATED}
        redirectTo={PathRoute.Home}
      >
        <SignIn />
      </PrivateRoute>
    )
  },
  {
    path: PathRoute.SignUp,
    element: (
      <PrivateRoute
        redirectFor={AuthStatus.AUTHENTICATED}
        redirectTo={PathRoute.Home}
      >
        <SignUp />
      </PrivateRoute>
    )
  },
  {
    path: PathRoute.Articles,
    element: <ArticlePage />
  },
  {
    path: PathRoute.Profile + `/:userId`,
    element: <Profile />
  }
]

const appRouter = createBrowserRouter(router)
export default appRouter
