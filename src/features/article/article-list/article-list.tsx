import { useAuth } from '@/contexts/auth/use-auth.hook'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import { ModeForm } from '@/enum/core/mode-form.enum'
import Articles from '@/features/article/article-list/components/articles/articles'
import Aside from '@/features/article/article-list/components/articles/components/aside/aside'
import ArticleTools from '@/features/article/article-tools/article-tools'
import FormArticle from '@/features/article/form-article/form-article'
import { useGetPosts } from '@/services/api/post.api'
import ButtonIcon from '@/shared/ui/button-icon/button-icon'
import Spinner from '@/shared/ui/spinner/spinner'
import Modal from '@/shared/widgets/modal/modal'
import { FC, useState } from 'react'

import styles from './article-list.module.css'

const ArticleList: FC = () => {
  const { authStatus } = useAuth()
  const [modeForm, setModeForm] = useState<ModeForm>(ModeForm.CLOSE)
  const [page, setPage] = useState(1)
  const { data: responsePosts, isLoading } = useGetPosts({
    query: {
      page: page,
      size: 10
    }
  })

  const posts = responsePosts?.data.posts || []

  const handleAddButtonClick = () => {
    setModeForm(ModeForm.ADD)
  }

  const handlePageChange = (newPage: number) => setPage(newPage)

  const total = responsePosts?.data.meta.total ?? 0
  const pageSize = responsePosts?.data.meta.pageSize ?? 0

  return (
    <div className={styles.articleList}>
      <ArticleTools>
        {authStatus === AuthStatus.AUTHENTICATED && (
          <ButtonIcon
            data-testid='add-button'
            icon='plus'
            onClick={handleAddButtonClick}
          >
            Добавить статью
          </ButtonIcon>
        )}
      </ArticleTools>
      {isLoading ? (
        <Spinner />
      ) : (
        <Articles posts={posts}>
          <Articles.List>
            {posts.map((post) => (
              <Articles.Item
                key={post.id}
                article={post}
                data-testid='article-item'
              />
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
        open={ModeForm.ADD === modeForm}
        title='Добавить статью'
        onClose={() => setModeForm(ModeForm.CLOSE)}
      >
        <FormArticle onSetModeForm={setModeForm} mode={modeForm} />
      </Modal>
    </div>
  )
}

export default ArticleList
