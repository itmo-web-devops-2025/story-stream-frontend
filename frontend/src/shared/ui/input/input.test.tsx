import { FormItemContext } from '@/contexts/form-item.context'
import { render, screen } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import Input from './input'

vi.mock('react-hook-form', async () => {
  const actual =
    await vi.importActual<typeof import('react-hook-form')>('react-hook-form')
  return {
    ...actual,
    useFormContext: vi.fn()
  }
})

describe('Input component', () => {
  const mockRegister = vi.fn(() => ({
    name: 'test',
    onChange: vi.fn(),
    ref: vi.fn()
  }))

  const renderWithProviders = (errors = {}) => {
    ;(useFormContext as unknown as vi.Mock).mockReturnValue({
      register: mockRegister,
      formState: { errors }
    })

    return render(
      <FormItemContext.Provider value={{ name: 'test' }}>
        <Input placeholder='Type here' />
      </FormItemContext.Provider>
    )
  }

  it('renders input when inside FormItemContext', () => {
    renderWithProviders()
    const input = screen.getByPlaceholderText('Type here')
    expect(input).toBeInTheDocument()
    expect(mockRegister).toHaveBeenCalledWith('test')
  })

  it('renders with error styles if field has error', () => {
    renderWithProviders({ test: { message: 'Required' } })
    const input = screen.getByPlaceholderText('Type here')
    expect(input.className).toMatch(/inputError/)
    expect(input.className).toMatch(/shake/)
  })

  it('returns null when context.name is missing', () => {
    ;(useFormContext as unknown as vi.Mock).mockReturnValue({
      register: mockRegister,
      formState: { errors: {} }
    })

    const { container } = render(
      <FormItemContext.Provider value={{}}>
        <Input />
      </FormItemContext.Provider>
    )

    expect(container.firstChild).toBeNull()
  })

  it('matches snapshot', () => {
    const { asFragment } = renderWithProviders()
    expect(asFragment()).toMatchSnapshot()
  })
})
