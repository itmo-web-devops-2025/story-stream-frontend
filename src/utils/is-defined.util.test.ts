import { isDefined } from '@/utils/is-defined.util'
import { describe, expect, it } from 'vitest'

describe('isDefined', () => {
  it('should return false for null and undefined', () => {
    expect(isDefined(null)).toBe(false)
    expect(isDefined(undefined)).toBe(false)
  })

  it('should return true for non-null and non-undefined values', () => {
    const values = [0, '', false, [], {}, 'hello', 42]
    values.forEach((value) => {
      expect(isDefined(value)).toBe(true)
    })
  })

  it('should act as a type guard in array filtering', () => {
    const mixed: (number | undefined | null)[] = [1, null, 2, undefined, 3]
    const filtered = mixed.filter(isDefined)
    expect(filtered).toEqual([1, 2, 3])
    // TypeScript knows `filtered` is number[] due to the type guard
    // Check that methods specific to numbers are available
    const sum = filtered.reduce((acc, cur) => acc + cur, 0)
    expect(sum).toBe(6)
  })
})
