import { useAuth } from '@/contexts/auth.context'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import AddArticle from '@/features/article/article-list/components/add-article/add-article'
import Articles from '@/features/article/article-list/components/articles/articles'
import Aside from '@/features/article/article-list/components/articles/components/aside/aside'
import ArticleTools from '@/features/article/article-tools/article-tools'
import { useGetPosts } from '@/services/api/post.api'
import ButtonIcon from '@/shared/ui/button-icon/button-icon'
import Spinner from '@/shared/ui/spinner/spinner'
import Modal from '@/shared/widgets/modal/modal'
import { FC, useState } from 'react'

import styles from './article-list.module.css'

const ArticleList: FC = () => {
  const { authStatus } = useAuth()
  const [openedModal, setOpenedModal] = useState(false)
  const [page, setPage] = useState(1)
  const { data: responsePosts, isLoading } = useGetPosts({
    query: {
      page: page,
      size: 10
    }
  })

  const posts = responsePosts?.data.posts || []

  const handleAddButtonClick = () => {
    setOpenedModal(true)
  }

  const handlePageChange = (newPage: number) => setPage(newPage)

  const total = responsePosts?.data.meta.total || 0
  const pageSize = responsePosts?.data.meta.pageSize || 0

  return (
    <div className={styles.articleList}>
      <ArticleTools>
        {authStatus === AuthStatus.AUTHENTICATED && (
          <>
            <ButtonIcon icon='plus' onClick={handleAddButtonClick}>
              Добавить статью
            </ButtonIcon>
          </>
        )}
      </ArticleTools>
      {isLoading ? (
        <Spinner />
      ) : (
        <Articles posts={posts}>
          <Articles.List>
            {posts.map((post) => (
              <Articles.Item key={post.id} article={post} />
            ))}
          </Articles.List>
          <Aside
            posts={posts}
            paginationProps={{
              pageSize: pageSize,
              currentPage: page,
              onPageChange: handlePageChange,
              totalItems: total
            }}
          />
        </Articles>
      )}
      <Modal
        open={openedModal}
        title='Добавить статью'
        onClose={() => setOpenedModal(false)}
      >
        <AddArticle onOpenedModal={setOpenedModal} />
      </Modal>
    </div>
  )
}

export default ArticleList
