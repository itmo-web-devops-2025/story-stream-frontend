import ArticleTools from '@/features/article/article-tools/article-tools'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('ArticleTools', () => {
  it('renders children inside the buttons container', () => {
    render(
      <ArticleTools>
        <button data-testid='test-button'>Click me</button>
      </ArticleTools>
    )

    // Проверяем, что кнопка отрендерилась
    const button = screen.getByTestId('test-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('has the correct structure and class names', () => {
    const { container } = render(
      <ArticleTools>
        <span>Tool</span>
      </ArticleTools>
    )

    // Проверяем структуру DOM
    const rootDiv = container.firstChild as HTMLElement
    expect(rootDiv.tagName).toBe('DIV')

    const buttonsDiv = rootDiv.querySelector('div') as HTMLElement
    expect(buttonsDiv).toBeDefined()

    // Внутри buttons должна быть наша span
    const span = buttonsDiv.querySelector('span')
    expect(span).toBeDefined()
    expect(span).toHaveTextContent('Tool')
  })
})
