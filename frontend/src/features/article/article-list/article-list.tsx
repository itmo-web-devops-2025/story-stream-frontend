import AddArticle from '@/features/article/article-list/components/add-article/add-article'
import ArticleTools from '@/features/article/article-list/components/article-tools/article-tools'
import Articles from '@/features/article/article-list/components/articles/articles'
import Aside from '@/features/article/article-list/components/articles/components/aside/aside'
import { useGetPosts } from '@/services/api/post.api'
import Modal from '@/shared/widgets/modal/modal'
import { FC, useState } from 'react'

import styles from './article-list.module.css'

const ArticleList: FC = () => {
  const [openedModal, setOpenedModal] = useState(false)
  const [page, setPage] = useState(1)
  const { data: responsePosts } = useGetPosts({
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
      <ArticleTools onAddButtonClick={handleAddButtonClick} />
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
      <Modal
        open={openedModal}
        title='Добавить статью'
        onClose={() => setOpenedModal(false)}
      >
        <AddArticle />
      </Modal>
    </div>
  )
}

export default ArticleList
