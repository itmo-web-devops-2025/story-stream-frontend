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

  // const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const generatePages = () => {
    const pages: (number | string)[] = []
    const siblingCount = 1 // по одному соседу слева и справа

    const leftSibling = Math.max(currentPage - siblingCount, 2)
    const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1)

    pages.push(1)

    if (leftSibling > 2) {
      pages.push('...')
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i)
    }

    if (rightSibling < totalPages - 1) {
      pages.push('...')
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = generatePages()
  return (
    <div className={styles.pagination}>
      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={page}
            className={cn(styles.button, {
              [styles.select]: page === currentPage
            })}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            {page}
          </span>
        )
      )}
    </div>
  )
}

export default Pagination
