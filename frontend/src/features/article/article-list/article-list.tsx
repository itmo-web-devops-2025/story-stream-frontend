import { useAuth } from '@/contexts/auth.context'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import AddArticle from '@/features/article/article-list/components/add-article/add-article'
import ArticleTools from '@/features/article/article-list/components/article-tools/article-tools'
import Articles from '@/features/article/article-list/components/articles/articles'
import { useGetPosts } from '@/services/api/post.api'
import Modal from '@/shared/widgets/modal/modal'
import { FC, useState } from 'react'

const ArticleList: FC = () => {
  const { authStatus } = useAuth()
  const [openedModal, setOpenedModal] = useState(false)
  const { data: responsePosts } = useGetPosts({ query: { page: 1 } })

  console.log(responsePosts)
  const handleAddButtonClick = () => {
    setOpenedModal(true)
  }

  return (
    <>
      <Articles>
        {authStatus === AuthStatus.AUTHENTICATED && (
          <ArticleTools onAddButtonClick={handleAddButtonClick} />
        )}
        {responsePosts?.data.map((post) => <Articles.Item article={post} />)}
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
