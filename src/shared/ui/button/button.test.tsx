import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Button from './button'

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('passes additional props to button element', () => {
    render(<Button type='submit'>Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
  
  it('matches snapshot', () => {
    const { asFragment } = render(<Button>Snapshot</Button>)
    expect(asFragment()).toMatchSnapshot()
  })
})
