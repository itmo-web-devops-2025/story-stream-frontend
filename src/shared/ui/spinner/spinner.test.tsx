import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Spinner from './spinner'
import styles from './spinner.module.css'

describe('Spinner', () => {
  it('renders container with correct class', () => {
    const { container } = render(<Spinner />)
    const wrapper = container.firstChild as HTMLElement

    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass(styles.container)
  })

  it('renders spinner element inside container', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector(`.${styles.spinner}`)

    expect(spinner).toBeInTheDocument()
  })
})
