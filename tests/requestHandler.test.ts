import { describe, it, expect, vi } from 'vitest'
import { requestHandler } from '../src/lib/requestHandler'

global.fetch = vi.fn(() =>
  Promise.resolve({
    status: 200,
    statusText: 'OK',
    headers: {
      get: (k: string) => (k === 'content-type' ? 'application/json' : ''),
      entries: () => [['x-test', 'yes']],
    },
    json: () => Promise.resolve({ foo: 'bar' }),
    text: () => Promise.resolve('{"foo":"bar"}'),
  })
) as any

describe('requestHandler', () => {
  it('returns response data and metadata', async () => {
    const res = await requestHandler({
      method: 'POST',
      url: 'https://fake.api/test',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      body: '{"id":1}',
    })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ foo: 'bar' })
    expect(res.headers['x-test']).toBe('yes')
    expect(res.time).toBeTypeOf('number')
  })
})
