import { PathRoute } from '@/constants/core/path-route.constant'
import { useAuth } from '@/contexts/auth.context'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import AddArticle from '@/features/article/article-list/components/add-article/add-article'
import ArticleTools from '@/features/article/article-list/components/article-tools/article-tools'
import Articles from '@/features/article/article-list/components/articles/articles'
import Modal from '@/shared/widgets/modal/modal'
import { FC, useState } from 'react'

const ArticleList: FC = () => {
  const { authStatus } = useAuth()
  const [openedModal, setOpenedModal] = useState(false)

  const handleAddButtonClick = () => {
    setOpenedModal(true)
  }

  return (
    <>
      <Articles>
        {authStatus === AuthStatus.AUTHENTICATED && (
          <ArticleTools onAddButtonClick={handleAddButtonClick} />
        )}
        <Articles.Item href={PathRoute.Articles} />
        <Articles.Item href={PathRoute.Articles} />
        <Articles.Item href={PathRoute.Articles} />
        <Articles.Item href={PathRoute.Articles} />
      </Articles>
      <Modal
        open={openedModal}
        title='Добавить статью'
        onClose={() => setOpenedModal(false)}
      >
        <AddArticle />
      </Modal>
    </>
  )
}

export default ArticleList
