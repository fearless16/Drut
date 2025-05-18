import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MethodSelector } from '../src/components/RequestBuilder/MethodSelector'
import { HTTP_METHODS } from '../src/constants/http'
import React from 'react'

describe('MethodSelector', () => {
  it('renders all HTTP methods', () => {
    const dummy = vi.fn()
    render(<MethodSelector method="GET" onChange={dummy} />)

    Object.values(HTTP_METHODS).forEach((method) => {
      expect(screen.getByRole('option', { name: method })).toBeInTheDocument()
    })
  })

  it('fires onChange when a method is selected', () => {
    const handleChange = vi.fn()
    render(<MethodSelector method="GET" onChange={handleChange} />)

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: HTTP_METHODS.POST },
    })

    expect(handleChange).toHaveBeenCalledWith('POST')
  })
})
