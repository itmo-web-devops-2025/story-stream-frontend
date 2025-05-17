import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Content from './content'
import styles from './content.module.css'

describe('Content component', () => {
  it('renders children inside the section element', () => {
    render(
      <Content>
        <p>Test content</p>
      </Content>
    )

    const paragraph = screen.getByText('Test content')
    const section = paragraph.closest('section')

    expect(section).toBeInTheDocument()
    expect(section).toHaveClass(styles.content)
  })
})
