import { useAuth } from '@/contexts/auth.context'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import ArticleList from '@/features/article/article-list/article-list'
import HeaderDefault from '@/features/header-default/header-default'
import Content from '@/shared/layouts/content/content'
import Footer from '@/shared/layouts/footer/footer'
import Page from '@/shared/layouts/page/page'

const Home = () => {
  const { user, authStatus } = useAuth()

  return (
    <Page>
      <HeaderDefault />
      {authStatus === AuthStatus.AUTHENTICATED && (
        <Page.Header title={user?.username} description={user?.bio} />
      )}
      <Content>
        <ArticleList />
      </Content>
      <Footer />
    </Page>
  )
}

export default Home
