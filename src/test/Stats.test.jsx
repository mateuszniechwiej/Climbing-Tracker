import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Stats from '../components/Stats'

const mockSessions = [
  {
    id: 1,
    date: '2026-06-20',
    duration: 90,
    climbs: [
      { color: 'Blue', gradeDifficulty: 'Medium', count: '5' },
      { color: 'Pink', gradeDifficulty: 'Hard', count: '3' },
    ]
  },
  {
    id: 2,
    date: '2026-06-21',
    duration: 60,
    climbs: [
      { color: 'Black', gradeDifficulty: 'Hard', count: '4' },
    ]
  }
]

describe('Stats component', () => {
  it('renders total sessions correctly', () => {
  render(<Stats sessions={mockSessions} saveSession={vi.fn()} updateSession={vi.fn()} />)
  expect(screen.getByText(/Total Sessions:/i)).toBeInTheDocument()
  })

  it('renders total climbs correctly', () => {
    render(<Stats sessions={mockSessions} saveSession={vi.fn()} updateSession={vi.fn()} />)
    expect(screen.getByText(/Total Climbs/i)).toBeInTheDocument()
  })

  it('renders streak section', () => {
    render(<Stats sessions={mockSessions} saveSession={vi.fn()} updateSession={vi.fn()} />)
    expect(screen.getByText(/Streak/i)).toBeInTheDocument()
  })
})
