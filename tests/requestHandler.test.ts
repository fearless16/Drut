import { describe, it, expect, vi, beforeEach } from 'vitest'
import { requestHandler, type RequestPayload } from '@/lib/requestHandler'

global.fetch = vi.fn()

const mockFetch = fetch as unknown as ReturnType<typeof vi.fn>

const buildResponse = ({
  status = 200,
  statusText = 'OK',
  body = '{}',
  headers = { 'content-type': 'application/json' },
} = {}) =>
  Promise.resolve({
    status,
    statusText,
    headers: {
      get: (key: string) => headers[key],
      entries: () => Object.entries(headers),
    },
    json: async () => JSON.parse(body),
    text: async () => body,
  })

const basePayload: RequestPayload = {
  method: 'POST',
  url: 'https://api.test.com',
  headers: [],
  body: JSON.stringify({ foo: 'bar' }),
}

describe('requestHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('parses valid JSON and returns response with JSON body', async () => {
    mockFetch.mockImplementation(() => buildResponse({ body: '{"msg":"ok"}' }))

    const res = await requestHandler(basePayload)

    expect(mockFetch).toHaveBeenCalledWith(basePayload.url, expect.any(Object))
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ msg: 'ok' })
    expect(res.headers).toHaveProperty('content-type')
    expect(res.time).toBeGreaterThanOrEqual(0)
  })

  it('returns text body if content-type is not JSON', async () => {
    mockFetch.mockImplementation(() =>
      buildResponse({
        body: 'plain text',
        headers: { 'content-type': 'text/plain' },
      })
    )

    const res = await requestHandler({ ...basePayload, body: undefined })

    expect(typeof res.body).toBe('string')
    expect(res.body).toBe('plain text')
  })

  it('adds default Content-Type if not provided', async () => {
    mockFetch.mockImplementation(() => buildResponse({}))

    await requestHandler(basePayload)

    const call = mockFetch.mock.calls[0][1]!
    expect((call as any).headers['Content-Type']).toBe('application/json')
  })

  it('respects existing Content-Type', async () => {
    mockFetch.mockImplementation(() => buildResponse({}))

    await requestHandler({
      ...basePayload,
      headers: [{ key: 'Content-Type', value: 'text/plain' }],
    })

    const call = mockFetch.mock.calls[0][1]!
    expect((call as any).headers['Content-Type']).toBe('text/plain')
  })

  it('handles invalid JSON body and continues request', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    mockFetch.mockImplementation(() => buildResponse({}))

    await requestHandler({
      ...basePayload,
      body: '{invalid json',
    })

    expect(warnSpy).toHaveBeenCalled()
    expect(mockFetch).toHaveBeenCalled()

    warnSpy.mockRestore()
  })

  it('handles empty body gracefully', async () => {
    mockFetch.mockImplementation(() => buildResponse({}))

    await requestHandler({
      ...basePayload,
      body: '',
    })

    const call = mockFetch.mock.calls[0][1]!
    expect((call as any).body).toBe(undefined)
  })
})
