import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Icon from './icon'
import styles from './icon.module.css'

describe('Icon component', () => {
  it('renders the icon with correct className based on the icon prop', () => {
    render(<Icon icon='home' />)
    const el = screen.getByTestId('icon')
    expect(el).toBeTruthy()
    expect(el).toHaveClass('lni')
    expect(el).toHaveClass('lni-home')
  })

  it('applies the filled class when isFilled is true', () => {
    render(<Icon icon='user' isFilled />)
    const el = screen.getByTestId('icon')
    expect(el).toHaveClass('lni-user')
    expect(el).toHaveClass(styles.iconFilled)
  })

  it('merges additional className prop', () => {
    render(<Icon icon='settings' className='custom-class' />)
    const el = screen.getByTestId('icon')
    expect(el).toHaveClass('custom-class')
    expect(el).toHaveClass('lni-settings')
  })

  it('passes additional props to the <i> element', () => {
    render(<Icon icon='bell' title='Notification icon' data-testid='icon' />)
    const el = screen.getByTestId('icon')
    expect(el).toHaveAttribute('title', 'Notification icon')
  })
})
