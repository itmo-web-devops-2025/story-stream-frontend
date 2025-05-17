import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Header from './header'

describe('Header', () => {
  it('renders children correctly', () => {
    render(
      <Header>
        <h1>Test Heading</h1>
      </Header>
    )

    const heading = screen.getByText('Test Heading')
    expect(heading).toBeInTheDocument()
  })
})
