import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import AppLink from './app-link'

describe('AppLink', () => {
  const renderWithRouter = (ui: React.ReactNode) =>
    render(<MemoryRouter>{ui}</MemoryRouter>)

  it('renders link with given text', () => {
    renderWithRouter(<AppLink to='/about'>About Us</AppLink>)
    const link = screen.getByRole('link', { name: /about us/i })
    expect(link).toBeInTheDocument()
  })

  it('has correct href', () => {
    renderWithRouter(<AppLink to='/contact'>Contact</AppLink>)
    const link = screen.getByRole('link', { name: /contact/i })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('applies class from styles', () => {
    renderWithRouter(<AppLink to='/'>Home</AppLink>)
    const link = screen.getByRole('link', { name: /home/i })
    expect(link.className).toMatch(/link/)
  })

  it('matches snapshot', () => {
    const { asFragment } = renderWithRouter(<AppLink to='/'>Home</AppLink>)
    expect(asFragment()).toMatchSnapshot()
  })
})
