import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AddSession from '../components/AddSession'

describe('AddSession component', () => {
  it('renders the form', () => {
    render(<AddSession onAdd={vi.fn()} onUpdate={vi.fn()} editSession={null} onCancelEdit={vi.fn()} />)
    expect(screen.getByText(/Add Session/i)).toBeInTheDocument()
  })

  it('shows editing mode when editSession is passed', () => {
    const mockSession = {
      id: 1,
      date: '2026-06-20',
      duration: 90,
      climbs: [{ color: 'Blue', gradeDifficulty: 'Medium', count: '3' }],
      notes: 'Good session'
    }
    render(<AddSession onAdd={vi.fn()} onUpdate={vi.fn()} editSession={mockSession} onCancelEdit={vi.fn()} />)
    expect(screen.getByText(/Update Session/i)).toBeInTheDocument()
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument()
  })

  it('shows Cancel button only in edit mode', () => {
    render(<AddSession onAdd={vi.fn()} onUpdate={vi.fn()} editSession={null} onCancelEdit={vi.fn()} />)
    expect(screen.queryByText(/Cancel/i)).not.toBeInTheDocument()
  })
})
