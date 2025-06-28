import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ResponseViewer } from '@/components/ResponseViewer'

vi.mock('localforage', async (importOriginal) => {
  const actual = (await importOriginal()) as object
  return {
    ...actual,
    getItem: vi.fn().mockResolvedValue('light'),
    setItem: vi.fn().mockResolvedValue(undefined),
  }
})

let mockThemeValue = { theme: 'light' }

vi.mock('@/context/ThemeContext', () => ({
  useTheme: () => mockThemeValue,
}))

describe.only('ResponseViewer', () => {
  it('renders status and statusText correctly', () => {
    render(
      <ResponseViewer
        response={{
          status: 200,
          statusText: 'OK',
          body: {},
          headers: {},
          time: 123,
        }}
      />
    )
    expect(screen.getByText(/200 OK/)).toBeInTheDocument()
    expect(screen.getByText(/⏱️ 123 ms/)).toBeInTheDocument()
  })

  it('renders fallback if statusText is missing', () => {
    render(<ResponseViewer response={{ status: 201, body: {} }} />)
    expect(screen.getByText('201')).toBeInTheDocument()
  })

  it('displays prettified JSON body', () => {
    const body = { message: 'yo', data: [1, 2, 3] }
    render(<ResponseViewer response={{ status: 200, body }} />)
    expect(screen.getByText(/"message": "yo"/)).toBeInTheDocument()
    expect(screen.getByText(/"data": \[/)).toBeInTheDocument()
  })

  it('displays raw string if body is not JSON', () => {
    const body = 'Raw string from server'
    render(<ResponseViewer response={{ status: 200, body }} />)
    expect(screen.getByText(/Raw string from server/)).toBeInTheDocument()
  })

  it('displays correct badge variant for 2xx', () => {
    render(<ResponseViewer response={{ status: 201, body: '' }} />)
    const badge = screen.getByText('201')
    expect(badge.className).toMatch(/bg-success/)
  })

  it('displays correct badge variant for 3xx', () => {
    render(<ResponseViewer response={{ status: 302, body: '' }} />)
    const badge = screen.getByText('302')
    expect(badge.className).toMatch(/bg-warning/)
  })

  it('displays correct badge variant for 4xx/5xx', () => {
    render(<ResponseViewer response={{ status: 404, body: '' }} />)
    const badge = screen.getByText('404')
    expect(badge.className).toMatch(/bg-danger/)
  })

  it('falls back to secondary for edge codes', () => {
    render(<ResponseViewer response={{ status: 102, body: '' }} />)
    const badge = screen.getByText('102')
    expect(badge.className).toMatch(/bg-secondary/)
  })

  it('uses dark theme background when active', () => {
    mockThemeValue = { theme: 'dark' }
    const { container } = render(
      <ResponseViewer response={{ status: 200, body: {} }} />
    )
    const pre = container.querySelector('pre')
    expect(pre?.className).toMatch(/bg-dark/)
  })

  it('uses light theme background when active', () => {
    mockThemeValue = { theme: 'light' }
    const { container } = render(
      <ResponseViewer response={{ status: 200, body: {} }} />
    )
    const pre = container.querySelector('pre')
    expect(pre?.className).toMatch(/bg-light/)
  })
})
