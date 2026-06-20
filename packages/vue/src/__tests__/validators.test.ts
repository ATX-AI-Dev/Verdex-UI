import { describe, it, expect } from 'vitest'
import {
  required,
  email,
  minLength,
  maxLength,
  pattern,
  sameAs,
  min,
  max,
} from '../validators'

describe('validators', () => {
  describe('required', () => {
    it('should validate non-empty values', () => {
      const val = required('error')
      expect(val('hello')).toBe(true)
      expect(val(123)).toBe(true)
      expect(val([1])).toBe(true)
    })

    it('should return error message for empty values', () => {
      const val = required('error')
      expect(val('')).toBe('error')
      expect(val(null)).toBe('error')
      expect(val(undefined)).toBe('error')
      expect(val([])).toBe('error')
    })
  })

  describe('email', () => {
    it('should pass for empty values', () => {
      const val = email()
      expect(val('')).toBe(true)
      expect(val(null)).toBe(true)
    })

    it('should validate correct emails', () => {
      const val = email('invalid')
      expect(val('test@example.com')).toBe(true)
      expect(val('user.name+tag@sub.domain.co.uk')).toBe(true)
    })

    it('should return error for invalid emails', () => {
      const val = email('invalid')
      expect(val('test')).toBe('invalid')
      expect(val('test@example')).toBe('invalid')
    })
  })

  describe('minLength', () => {
    it('should pass for empty values', () => {
      const val = minLength(5)
      expect(val('')).toBe(true)
    })

    it('should validate string lengths', () => {
      const val = minLength(5, 'error')
      expect(val('12345')).toBe(true)
      expect(val('123456')).toBe(true)
      expect(val('1234')).toBe('error')
    })
  })

  describe('maxLength', () => {
    it('should pass for empty values', () => {
      const val = maxLength(5)
      expect(val('')).toBe(true)
    })

    it('should validate string lengths', () => {
      const val = maxLength(5, 'error')
      expect(val('12345')).toBe(true)
      expect(val('1234')).toBe(true)
      expect(val('123456')).toBe('error')
    })
  })

  describe('pattern', () => {
    it('should pass for empty values', () => {
      const val = pattern(/^\d+$/)
      expect(val('')).toBe(true)
    })

    it('should validate regular expressions', () => {
      const val = pattern(/^\d+$/, 'error')
      expect(val('12345')).toBe(true)
      expect(val('abc')).toBe('error')
    })
  })

  describe('sameAs', () => {
    it('should validate matching values', () => {
      const other = () => 'match'
      const val = sameAs(other, 'error')
      expect(val('match')).toBe(true)
      expect(val('no-match')).toBe('error')
    })
  })

  describe('min', () => {
    it('should pass for empty values', () => {
      const val = min(5)
      expect(val('')).toBe(true)
    })

    it('should validate minimum numeric value', () => {
      const val = min(5, 'error')
      expect(val(5)).toBe(true)
      expect(val(6)).toBe(true)
      expect(val(4)).toBe('error')
    })
  })

  describe('max', () => {
    it('should pass for empty values', () => {
      const val = max(5)
      expect(val('')).toBe(true)
    })

    it('should validate maximum numeric value', () => {
      const val = max(5, 'error')
      expect(val(5)).toBe(true)
      expect(val(4)).toBe(true)
      expect(val(6)).toBe('error')
    })
  })
})
