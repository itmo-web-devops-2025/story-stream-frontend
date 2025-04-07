import { PaginationProps } from '@/shared/ui/pagination/pagination.type'
import cn from 'classnames'
import type { FC } from 'react'

import styles from './pagination.module.css'

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / pageSize)

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          className={cn(styles.button, {
            [styles.select]: page === currentPage
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination
