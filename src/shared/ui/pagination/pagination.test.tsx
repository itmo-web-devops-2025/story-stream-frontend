import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Pagination from './pagination'
import styles from './pagination.module.css'

describe('Pagination', () => {
  it('does not render if totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalItems={5}
        pageSize={10}
        onPageChange={() => {}}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders correct number of pages and ellipsis', () => {
    render(
      <Pagination
        currentPage={5}
        totalItems={100}
        pageSize={10}
        onPageChange={() => {}}
      />
    )

    // totalPages = 10
    // currentPage = 5 → should show: 1 ... 4 5 6 ... 10
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getAllByText('...')).toHaveLength(2)
  })

  it('calls onPageChange with correct page number', () => {
    const handlePageChange = vi.fn()

    render(
      <Pagination
        currentPage={2}
        totalItems={30}
        pageSize={5}
        onPageChange={handlePageChange}
      />
    )

    const pageButton = screen.getByText('3')
    fireEvent.click(pageButton)

    expect(handlePageChange).toHaveBeenCalledWith(3)
  })

  it('highlights the current page', () => {
    render(
      <Pagination
        currentPage={3}
        totalItems={50}
        pageSize={5}
        onPageChange={() => {}}
      />
    )

    const currentPageButton = screen.getByText('3')
    expect(currentPageButton).toHaveClass(styles.select)
  })
})
