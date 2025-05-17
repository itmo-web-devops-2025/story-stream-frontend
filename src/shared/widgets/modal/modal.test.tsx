import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Modal from './modal'

describe('Modal', () => {
  it('should not be visible when open is false', () => {
    const { container } = render(
      <Modal open={false} title='Test Modal' onClose={vi.fn()}>
        Content
      </Modal>
    )
    const dialog = container.querySelector('dialog')
    expect(dialog).toBeTruthy()

    // overlay — родитель dialog
    const overlay = dialog!.parentElement
    expect(overlay).toHaveAttribute('data-open', 'false')
  })

  it('should be visible and render title and children when open is true', () => {
    const { container } = render(
      <Modal open={true} title='Test Modal' onClose={vi.fn()}>
        Content
      </Modal>
    )

    const dialog = container.querySelector('dialog')
    expect(dialog).toBeTruthy()
    expect(dialog).toHaveAttribute('data-open', 'true')

    const heading = dialog!.querySelector('h2')
    expect(heading).toHaveTextContent('Test Modal')

    expect(screen.getByText('Content')).toBeInTheDocument()

    const closeButton = dialog!.querySelector('button')
    expect(closeButton).toBeTruthy()
  })

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} title='Test Modal' onClose={onClose}>
        Content
      </Modal>
    )

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    const { container } = render(
      <Modal open={true} title='Test Modal' onClose={onClose}>
        Content
      </Modal>
    )

    const dialog = container.querySelector('dialog')
    expect(dialog).toBeTruthy()

    const closeButton = dialog!.querySelector('button')
    expect(closeButton).toBeTruthy()

    fireEvent.click(closeButton!)
    expect(onClose).toHaveBeenCalled()
  })

  it('does not add Escape key listener when open is false', () => {
    const onClose = vi.fn()
    render(
      <Modal open={false} title='Test Modal' onClose={onClose}>
        Content
      </Modal>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })
})
