import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Page from './page'
import { MemoryRouter } from 'react-router'

describe('Page component', () => {
  it('renders children inside main element', () => {
    render(
      <Page>
        <div data-testid='child'>Hello, world!</div>
      </Page>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})

describe('Page.Header component', () => {
  it('renders title as string when no linkProps provided', () => {
    render(<Page.Header title='Test Title' />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Title').tagName).toBe('H2')
  })

  it('renders title as ReactElement when no linkProps provided', () => {
    render(<Page.Header title={<span>Custom Title</span>} />)
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom Title').tagName).toBe('SPAN')
  })

  it('renders description when provided', () => {
    render(<Page.Header title='Title' description='This is description' />)
    expect(screen.getByText('This is description')).toBeInTheDocument()
  })

  it('renders Link when linkProps provided', () => {
    render(
      <MemoryRouter>
        <Page.Header
          linkProps={{
            to: '/test',
            children: 'Go to test',
            className: 'custom-link'
          }}
        />
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: 'Go to test' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('custom-link')
    expect(link.getAttribute('href')).toBe('/test')
  })
})
