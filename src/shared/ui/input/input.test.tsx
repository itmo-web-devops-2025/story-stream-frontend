import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useForm, FormProvider } from 'react-hook-form'
import { FormItemContext } from '@/contexts/form-item.context'
import Input from './input'

const Wrapper = ({
  name,
  children
}: {
  name: string
  children: React.ReactNode
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

// Новый обертка для теста без имени, с хук вызовом внутри компонента
const NoNameWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <FormItemContext.Provider value={{ name: '' }}>
        {children}
      </FormItemContext.Provider>
    </FormProvider>
  )
}

describe('Input component', () => {
  it('renders input field inside proper context', () => {
    render(
      <Wrapper name='test'>
        <Input placeholder='Enter text' />
      </Wrapper>
    )

    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('does not render input without context name', () => {
    const consoleWarnMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    render(
      <NoNameWrapper>
        <Input placeholder='Enter text' />
      </NoNameWrapper>
    )

    expect(screen.queryByPlaceholderText('Enter text')).toBeNull()
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Input must be inside a Form.Item with a name'
    )

    consoleWarnMock.mockRestore()
  })
})
