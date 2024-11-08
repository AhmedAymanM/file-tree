import { env } from '@/utils/env'

export async function fetcher<TResponse>(
  url: string,
  init?: RequestInit
): Promise<TResponse> {
  const response = await fetch(env.BASE_API_URL + url, init)

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()
  return data
}

export const api = {
  get: <TResponse>(url: string) => fetcher<TResponse>(url),
  post: <TResponse>(url: string, body: unknown) =>
    fetcher<TResponse>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
}
