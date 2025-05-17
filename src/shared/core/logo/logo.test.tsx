import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import Logo from './logo'

describe('Logo', () => {
  it('renders the logo text correctly', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    )

    expect(screen.getByText('Story')).toBeInTheDocument()

    const accentElement = screen.getByText('Stream')
    expect(accentElement).toBeInTheDocument()
    expect(accentElement.tagName).toBe('SPAN')
  })

  it('has the link pointing to "/"', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/')
  })
})
