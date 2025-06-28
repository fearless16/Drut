export interface RequestPayload {
  method: string
  url: string
  headers: { key: string; value: string }[]
  body?: string
}

export async function requestHandler(payload: RequestPayload) {
  const { method, url, headers, body } = payload
  const start = performance.now()

  let parsedBody = undefined
  if (body) {
    try {
      parsedBody = JSON.parse(body)
    } catch (err) {
      console.warn('Invalid JSON body:', err)
    }
  }

  const response = await fetch(url, {
    method,
    headers: getHeaders(headers),
    body: parsedBody ? JSON.stringify(parsedBody) : undefined,
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

function getHeaders(headers: { key: string; value: string }[]) {
  if (!headers.find((header) => header.key === 'Content-Type')) {
    headers.push({
      key: 'Content-Type',
      value: 'application/json',
    })
  }
  const res = headers.reduce(
    (acc, h) => {
      if (h.key && h.value != null) acc[h.key] = h.value
      return acc
    },
    {} as Record<string, string>
  )

  return res
}
