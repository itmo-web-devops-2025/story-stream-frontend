import { dateFormat } from '@/utils/date-format.util'
import dayjs from 'dayjs'
import { describe, expect, it, vi } from 'vitest'

// Mock AppConfig to control the date format
vi.mock('@/config/app.config', () => ({
  AppConfig: { DateFormat: 'YYYY-MM-DD' }
}))

// Unit tests for the dateFormat function
describe('dateFormat', () => {
  it('should format the date according to AppConfig.DateFormat', () => {
    const testDate = new Date(2025, 0, 15, 13, 45, 30) // Jan 15, 2025, 13:45:30
    const expected = dayjs(testDate).format('YYYY-MM-DD')
    expect(dateFormat(testDate)).toBe(expected)
  })

  it('should handle different dates correctly', () => {
    const dates = [
      new Date(2021, 11, 31), // Dec 31, 2021
      new Date(1999, 6, 4, 0, 0), // Jul 4, 1999
      new Date(2000, 1, 29) // Feb 29, 2000 (leap year)
    ]

    dates.forEach((d) => {
      expect(dateFormat(d)).toBe(dayjs(d).format('YYYY-MM-DD'))
    })
  })
})
