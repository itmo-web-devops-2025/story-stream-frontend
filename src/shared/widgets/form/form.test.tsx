import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useForm } from 'react-hook-form'

import Form from './form'
import { useEffect } from 'react'

describe('Form component', () => {
  it('renders form and form item with label', () => {
    const TestComponent = () => {
      const form = useForm<{ test: string }>()
      return (
        <Form form={form}>
          <Form.Item name='test' label='Test Label'>
            <input id='test' {...form.register('test')} />
          </Form.Item>
        </Form>
      )
    }

    render(<TestComponent />)

    expect(document.querySelector('form')).toBeInTheDocument()
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('shows error message when error exists', () => {
    const TestComponent = () => {
      const form = useForm<{ test: string }>({
        defaultValues: { test: '' }
      })

      useEffect(() => {
        form.setError('test', { type: 'manual', message: 'Error message' })
      }, [])

      return (
        <Form form={form}>
          <Form.Item name='test' label='Test Label'>
            <input id='test' {...form.register('test')} />
          </Form.Item>
        </Form>
      )
    }

    render(<TestComponent />)

    expect(screen.getByText('Error message')).toBeInTheDocument()
  })
})
