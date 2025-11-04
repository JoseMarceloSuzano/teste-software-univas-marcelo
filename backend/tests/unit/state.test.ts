import { describe, it, expect } from 'vitest'
import { canTransition, Status } from '../../src/utils/taskRules'

describe('canTrasition', () => {
  it('Não permite troca do status', () => {
    expect(canTransition("CANCELLED", "COMPLETED")).toBe(false)
  })
})