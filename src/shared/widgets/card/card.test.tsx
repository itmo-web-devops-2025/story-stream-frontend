import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Card from './card'

describe('Card component', () => {
  it('renders Card with children', () => {
    render(<Card>Test content</Card>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders Card.Title with children and passes props', () => {
    render(<Card.Title id='title-id'>Card Title</Card.Title>)
    const title = screen.getByText('Card Title')
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe('H2')
    expect(title).toHaveAttribute('id', 'title-id')
  })

  it('renders Card.Text with children', () => {
    render(<Card.Text>Paragraph text</Card.Text>)
    const paragraph = screen.getByText('Paragraph text')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph.tagName).toBe('P')
  })

  it('applies correct CSS classes from styles', () => {
    render(
      <Card>
        <Card.Title>Title</Card.Title>
        <Card.Text>Text</Card.Text>
      </Card>
    )

    const card = screen.getByText('Title').parentElement
    expect(card).not.toBeNull()
    expect(card!.className).toMatch(/card/)
    expect(screen.getByText('Title').className).toMatch(/title/)
    expect(screen.getByText('Text').className).toMatch(/text/)
  })
})
