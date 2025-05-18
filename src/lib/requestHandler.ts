export interface RequestPayload {
  method: string
  url: string
  headers: { key: string; value: string }[]
  body?: string
}

export async function requestHandler(payload: RequestPayload) {
  const { method, url, headers, body } = payload

  const start = performance.now()

  const response = await fetch(url, {
    method,
    headers: headers.reduce(
      (acc, h) => {
        if (h.key) acc[h.key] = h.value
        return acc
      },
      {} as Record<string, string>
    ),
    body: ['GET', 'HEAD'].includes(method.toUpperCase()) ? undefined : body,
  })

  const contentType = response.headers.get('content-type')
  const isJson = contentType?.includes('application/json')

  const responseBody = isJson ? await response.json() : await response.text()
  const time = Math.round(performance.now() - start)

  return {
    status: response.status,
    statusText: response.statusText,
    body: responseBody,
    headers: Object.fromEntries(response.headers.entries()),
    time,
  }
}
