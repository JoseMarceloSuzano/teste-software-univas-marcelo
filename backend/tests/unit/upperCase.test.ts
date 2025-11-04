import { describe, it, expect } from 'vitest'
import { normalizeName } from '../../src/utils/normalize'

describe('canNormalize', () => {
  it('Uppercase', () => {
    expect(normalizeName('TESTE')).toBe('teste')
  })
})