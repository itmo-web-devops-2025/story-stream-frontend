import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router' // импорт роутера для тестов
import NavMenu from './nav-menu'

describe('NavMenu', () => {
  it('renders a Link when isButton is false and linkProps provided', () => {
    render(
      <MemoryRouter>
        <NavMenu>
          <NavMenu.Item isButton={false} linkProps={{ to: '/test' }}>
            Link Item
          </NavMenu.Item>
        </NavMenu>
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: 'Link Item' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('renders a button when isButton is true', () => {
    const onClick = vi.fn()
    render(
      <NavMenu>
        <NavMenu.Item isButton buttonProps={{ onClick }}>
          Button Item
        </NavMenu.Item>
      </NavMenu>
    )
    const button = screen.getByRole('button', { name: 'Button Item' })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })
})
