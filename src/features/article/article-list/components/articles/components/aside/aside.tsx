import { PathRoute } from '@/constants/core/path-route.constant'
import Pagination from '@/shared/ui/pagination/pagination'
import { PaginationProps } from '@/shared/ui/pagination/pagination.type'
import { Post } from '@/types/post/post.interface'

import styles from './aside.module.css'

export type AsideProps = {
  posts?: Post[]
  paginationProps?: PaginationProps
}

const Aside = ({ posts, paginationProps }: AsideProps) => (
  <aside aria-label='Оглавление' className={styles.aside}>
    {paginationProps && <Pagination {...paginationProps} />}
    <ol className={styles.asideList}>
      {posts?.map((item) => (
        <li className={styles.asideItem} key={item.id}>
          <a href={`${PathRoute.Articles}/${item.id}`}>{item.title}</a>
        </li>
      ))}
    </ol>
  </aside>
)

export default Aside
