// textarea.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useForm, FormProvider } from 'react-hook-form'
import { FormItemContext } from '@/contexts/form-item.context'
import Textarea from './textarea'
import React from 'react'

const Wrapper = ({
  children,
  name = 'testField'
}: {
  children: React.ReactNode
  name?: string
}) => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <FormItemContext.Provider value={{ name }}>
        {children}
      </FormItemContext.Provider>
    </FormProvider>
  )
}

describe('Textarea', () => {
  it('renders the textarea', () => {
    render(
      <Wrapper>
        <Textarea />
      </Wrapper>
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('applies error class when error exists', async () => {
    const WrapperWithError = () => {
      const methods = useForm()
      const { setError } = methods

      // Ставим ошибку один раз при монтировании
      React.useEffect(() => {
        setError('test', { type: 'manual', message: 'Test error' })
      }, [setError])

      return (
        <FormProvider {...methods}>
          <FormItemContext.Provider value={{ name: 'test' }}>
            <Textarea />
          </FormItemContext.Provider>
        </FormProvider>
      )
    }

    const { container } = render(<WrapperWithError />)

    const textarea = container.querySelector('textarea')

    expect(textarea?.className).toMatch(/error/)
  })

  it('calls onSubmit on Enter key (without Shift)', () => {
    const handleSubmit = vi.fn()

    render(
      <Wrapper>
        <Textarea onSubmit={handleSubmit} />
      </Wrapper>
    )

    const textarea = screen.getByRole('textbox')
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })

    expect(handleSubmit).toHaveBeenCalled()
  })

  it('does not call onSubmit on Shift+Enter', () => {
    const handleSubmit = vi.fn()

    render(
      <Wrapper>
        <Textarea onSubmit={handleSubmit} />
      </Wrapper>
    )

    const textarea = screen.getByRole('textbox')
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true })

    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('does not render when context.name is missing', () => {
    const WrapperWithoutContextName = () => {
      const methods = useForm()
      return (
        <FormProvider {...methods}>
          <FormItemContext.Provider value={null}>
            <Textarea />
          </FormItemContext.Provider>
        </FormProvider>
      )
    }

    const { container } = render(<WrapperWithoutContextName />)

    expect(container.firstChild).toBeNull()
  })
})
