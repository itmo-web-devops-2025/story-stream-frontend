import { capitalizeWords } from '@/utils/capitalize-word.util'
import { describe, expect, it } from 'vitest'

describe('Util: capitalizeWords', () => {
  it('should return an empty string when input is empty', () => {
    expect(capitalizeWords('')).toBe('')
  })

  it('should handle a single word correctly', () => {
    expect(capitalizeWords('hello')).toBe('Hello')
    expect(capitalizeWords('Hello')).toBe('Hello')
  })

  it('should handle multiple words correctly', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World')
    expect(capitalizeWords('multiple words here')).toBe('Multiple Words Here')
  })

  it('should preserve spaces between words', () => {
    expect(capitalizeWords('  leading and trailing  ')).toBe(
      '  Leading And Trailing  '
    )
  })

  it('should work with mixed case input', () => {
    expect(capitalizeWords('mIxEd CaSe')).toBe('MIxEd CaSe')
  })

  it('should handle special characters and numbers', () => {
    expect(capitalizeWords('123 abc!')).toBe('123 Abc!')
  })
})
