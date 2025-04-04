import { PathRoute } from '@/constants/core/path-route.constant'
import AddArticle from '@/features/article/article-list/components/add-article/add-article'
import ArticleTools from '@/features/article/article-list/components/article-tools/article-tools'
import Articles from '@/features/article/article-list/components/articles/articles'
import Modal from '@/shared/widgets/modal/modal'
import { FC, useState } from 'react'

const ArticleList: FC = () => {
  console.log(`ArticleList component is working`)
  const [openedModal, setOpenedModal] = useState(false)

  const handleAddButtonClick = () => {
    setOpenedModal(true)
  }

  return (
    <>
      <Articles>
        <ArticleTools onAddButtonClick={handleAddButtonClick} />
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
