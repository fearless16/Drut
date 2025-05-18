import { describe, it, expect } from 'vitest'
import { resolveEnvVars } from '@/lib/envResolver'

describe('resolveEnvVars', () => {
  const vars = [
    { key: 'API_KEY', value: '12345' },
    { key: 'HOST', value: 'api.example.com' },
  ]

  it('replaces single variable', () => {
    const str = 'Authorization: Bearer {{API_KEY}}'
    expect(resolveEnvVars(str, vars)).toBe('Authorization: Bearer 12345')
  })

  it('replaces multiple variables', () => {
    const str = 'https://{{HOST}}/v1/data?token={{API_KEY}}'
    expect(resolveEnvVars(str, vars)).toBe(
      'https://api.example.com/v1/data?token=12345'
    )
  })

  it('ignores missing variables', () => {
    const str = 'https://{{UNKNOWN}}/test'
    expect(resolveEnvVars(str, vars)).toBe('https://{{UNKNOWN}}/test')
  })
})
