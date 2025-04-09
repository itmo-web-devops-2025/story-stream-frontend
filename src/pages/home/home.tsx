import { PathRoute } from '@/constants/core/path-route.constant'
import { useAuth } from '@/contexts/auth.context'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import ArticleList from '@/features/article/article-list/article-list'
import HeaderDefault from '@/features/header-default/header-default'
import { useGetUser } from '@/services/api/user.api'
import Content from '@/shared/layouts/content/content'
import Footer from '@/shared/layouts/footer/footer'
import Page from '@/shared/layouts/page/page'

const Home = () => {
  const { user, authStatus } = useAuth()
  const { data: userResponse } = useGetUser(user?.id)
  const userInfo = userResponse?.data

  return (
    <Page>
      <HeaderDefault />
      {authStatus === AuthStatus.AUTHENTICATED && user && (
        <Page.Header
          linkProps={{
            to: `${PathRoute.Profile}/${user.id}`,
            children: user?.username
          }}
          description={userInfo?.bio}
        />
      )}
      <Content>
        <ArticleList />
      </Content>
      <Footer />
    </Page>
  )
}

export default Home
