import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ButtonIcon from './button-icon'

vi.mock('@/shared/core/icon/icon', () => ({
  default: ({ icon }: { icon: string }) => (
    <span data-testid='icon'>{icon}</span>
  )
}))

describe('ButtonIcon component', () => {
  it('renders the icon', () => {
    render(<ButtonIcon icon='search' />)
    expect(screen.getByTestId('icon')).toHaveTextContent('search')
  })

  it('renders children correctly', () => {
    render(<ButtonIcon icon='plus'>Add</ButtonIcon>)
    expect(screen.getByRole('button')).toHaveTextContent('Add')
  })

  it('applies custom className', () => {
    render(<ButtonIcon icon='check' className='custom-class' />)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('passes additional button props', async () => {
    const handleClick = vi.fn()
    render(
      <ButtonIcon icon='save' type='submit' onClick={handleClick}>
        Save
      </ButtonIcon>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <ButtonIcon icon='download'>Download</ButtonIcon>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
