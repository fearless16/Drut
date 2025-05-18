import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ResponseViewer } from '../src/components/ResponseViewer'
import React from 'react'

describe('ResponseViewer', () => {
  it('renders status code and message', () => {
    const res = {
      status: 200,
      statusText: 'OK',
      body: { success: true },
    }

    render(<ResponseViewer response={res} />)

    expect(screen.getByText(/200/)).toBeInTheDocument()
    expect(screen.getByText(/OK/)).toBeInTheDocument()
  })

  it('pretty prints JSON response body', () => {
    const res = {
      status: 200,
      body: { foo: 'bar' },
    }

    render(<ResponseViewer response={res} />)
    expect(
      screen.getByText((content) => content.includes('"foo": "bar"'))
    ).toBeInTheDocument()
  })

  it('renders non-JSON body as string', () => {
    const res = {
      status: 200,
      body: '<html>not-json</html>',
    }

    render(<ResponseViewer response={res} />)
    expect(
      screen.getByText((text) => text.includes('<html>not-json</html>'))
    ).toBeInTheDocument()
  })

  it('renders response time if available', () => {
    const res = {
      status: 200,
      body: {},
      time: 123,
    }

    render(<ResponseViewer response={res} />)
    expect(screen.getByText('(123 ms)')).toBeInTheDocument()
  })
})
