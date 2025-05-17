import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Footer from './footer'

describe('Footer', () => {
  it('renders authors links with correct href and text', () => {
    render(<Footer />)

    const frontendLink = screen.getByText(/Frontend Ivan Monichev/i)
    expect(frontendLink).toBeInTheDocument()
    expect(frontendLink).toHaveAttribute(
      'href',
      'https://github.com/IvanMonichev'
    )
    expect(frontendLink).toHaveAttribute('target', '_blank')

    const backendLink = screen.getByText(/Backend Stanislav Ziganshin/i)
    expect(backendLink).toBeInTheDocument()
    expect(backendLink).toHaveAttribute('href', 'https://github.com/TatarJesus')
    expect(backendLink).toHaveAttribute('target', '_blank')
  })

  it('renders copyright text with current year', () => {
    render(<Footer />)

    const copyright = screen.getByText(
      new RegExp(`Санкт-Петербург © ${new Date().getFullYear()} г.`, 'i')
    )
    expect(copyright).toBeInTheDocument()
  })

  it('renders app version', () => {
    render(<Footer />)

    const versionText = screen.getByText(
      new RegExp(`Версия – ${__APP_VERSION__}`)
    )
    expect(versionText).toBeInTheDocument()
  })
})
