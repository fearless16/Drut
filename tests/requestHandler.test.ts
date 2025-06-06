import { requestHandler, type RequestPayload } from '@/lib/requestHandler'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  fetchMock = vi.fn()
  global.fetch = fetchMock as any
})

afterEach(() => {
  vi.resetAllMocks()
})

const defaultHeaders = [{ key: 'Content-Type', value: 'application/json' }]

describe('requestHandler', () => {
  it('handles GET request with JSON response', async () => {
    const jsonResponse = { success: true }
    fetchMock.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      headers: {
        get: (key: string) => (key === 'content-type' ? 'application/json' : null),
        entries: () => [['content-type', 'application/json']],
      },
      json: async () => jsonResponse,
      text: async () => JSON.stringify(jsonResponse),
    })

    const payload: RequestPayload = {
      method: 'GET',
      url: 'https://example.com',
      headers: defaultHeaders,
    }

    const res = await requestHandler(payload)

    expect(res.status).toBe(200)
    expect(res.statusText).toBe('OK')
    expect(res.body).toEqual(jsonResponse)
    expect(typeof res.time).toBe('number')
    expect(res.headers).toHaveProperty('content-type')
  })

  it('handles POST request with text response', async () => {
    fetchMock.mockResolvedValue({
      status: 201,
      statusText: 'Created',
      headers: {
        get: (key: string) => (key === 'content-type' ? 'text/plain' : null),
        entries: () => [['content-type', 'text/plain']],
      },
      json: async () => ({}),
      text: async () => 'Created',
    })

    const payload: RequestPayload = {
      method: 'POST',
      url: 'https://example.com/submit',
      headers: [],
      body: 'some-data',
    }

    const res = await requestHandler(payload)

    expect(res.status).toBe(201)
    expect(res.statusText).toBe('Created')
    expect(res.body).toBe('Created')
  })

  it('handles custom headers correctly', async () => {
    fetchMock.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      headers: {
        get: () => 'application/json',
        entries: () => [],
      },
      json: async () => ({}),
      text: async () => '',
    })

    const payload: RequestPayload = {
      method: 'GET',
      url: 'https://example.com',
      headers: [{ key: 'Authorization', value: 'Bearer token' }],
    }

    await requestHandler(payload)

    expect(fetchMock).toHaveBeenCalledWith('https://example.com', expect.objectContaining({
      headers: { Authorization: 'Bearer token' },
    }))
  })

  it('omits body for GET and HEAD methods', async () => {
    fetchMock.mockResolvedValue({
      status: 204,
      statusText: 'No Content',
      headers: {
        get: () => 'application/json',
        entries: () => [],
      },
      json: async () => ({}),
      text: async () => '',
    })

    const methods = ['GET', 'HEAD']
    for (const method of methods) {
      await requestHandler({
        method,
        url: 'https://example.com',
        headers: [],
        body: 'should-not-send',
      })

      expect(fetchMock).toHaveBeenCalledWith('https://example.com', expect.objectContaining({
        body: undefined,
      }))
    }
  })

  it('handles missing content-type gracefully', async () => {
    fetchMock.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      headers: {
        get: () => null,
        entries: () => [],
      },
      json: async () => ({}),
      text: async () => 'raw-text',
    })

    const payload: RequestPayload = {
      method: 'GET',
      url: 'https://example.com/raw',
      headers: [],
    }

    const res = await requestHandler(payload)

    expect(res.body).toBe('raw-text')
  })
})
