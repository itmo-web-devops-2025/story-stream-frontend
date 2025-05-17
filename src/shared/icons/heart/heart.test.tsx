import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Heart from './heart.tsx'

describe('Heart', () => {
  it('renders filled heart when isFill is true', () => {
    render(<Heart isFill={true} />)
    const svg = screen.getByTestId('heart-svg')
    const path = svg.querySelector('path')
    expect(path).toHaveAttribute('fill', '#b20d0d')
  })

  it('renders empty heart when isFill is false or undefined', () => {
    render(<Heart />)
    const svg = screen.getByTestId('heart-svg')
    const path = svg.querySelector('path')
    expect(path).toHaveAttribute('fill', '#343C54')
  })
})
