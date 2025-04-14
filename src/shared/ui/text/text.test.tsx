import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Text from './text'

describe('Text component', () => {
  it('renders children correctly in Paragraph', () => {
    render(<Text.Paragraph>Test Paragraph</Text.Paragraph>)
    const paragraph = screen.getByText('Test Paragraph')
    expect(paragraph).toBeInTheDocument()
  })

  it('does not apply intrigued class when intrigued prop is false', () => {
    render(<Text.Paragraph intrigued={false}>Test Paragraph</Text.Paragraph>)
    const paragraph = screen.getByText('Test Paragraph')
    expect(paragraph).not.toHaveClass('textIntrigue')
  })

  it('applies custom className', () => {
    render(
      <Text.Paragraph className='custom-class'>Test Paragraph</Text.Paragraph>
    )
    const paragraph = screen.getByText('Test Paragraph')
    expect(paragraph).toHaveClass('custom-class')
  })

  it('matches snapshot for Paragraph', () => {
    const { asFragment } = render(
      <Text.Paragraph>Test Paragraph</Text.Paragraph>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders children correctly in Text component', () => {
    render(<Text>Some Text</Text>)
    expect(screen.getByText('Some Text')).toBeInTheDocument()
  })
})
