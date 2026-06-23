import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import useClimbingStats from '../hooks/useClimbingStats'

describe('useClimbingStats', () => {
  it('returns 0 streak when no sessions', () => {
    const { result } = renderHook(() => useClimbingStats([]))
    expect(result.current.streak).toBe(0)
  })

  it('returns correct streak for consecutive days', () => {
    const today = new Date().toISOString().slice(0, 10)
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const sessions = [
      { date: today, climbs: [], duration: 60 },
      { date: yesterday, climbs: [], duration: 60 },
    ]
    const { result } = renderHook(() => useClimbingStats(sessions))
    expect(result.current.streak).toBeGreaterThanOrEqual(2)
  })

  it('resets streak when days are not consecutive', () => {
    const sessions = [
      { date: '2026-06-01', climbs: [], duration: 60 },
      { date: '2026-06-10', climbs: [], duration: 60 },
    ]
    const { result } = renderHook(() => useClimbingStats(sessions))
    expect(result.current.streak).toBe(0)
  })
})
