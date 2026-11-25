import { env } from '@/utils/env'
import { getTreeNodesMock } from '@/api/get-tree-nodes.stub'
import { getTreeEntryMock } from '@/api/get-tree-entry.stub'

export type MockHandler = {
  /** Returns captured params when the path matches, otherwise null. */
  match: (path: string) => string[] | null
  respond: (params: string[]) => { body: unknown; status?: number }
}

const handlers: MockHandler[] = [getTreeNodesMock, getTreeEntryMock]

export function installMockFetch(latencyMs = 300) {
  const realFetch = window.fetch.bind(window)

  window.fetch = async (input, init) => {
    const url = input instanceof Request ? input.url : String(input)
    if (!url.startsWith(env.BASE_API_URL)) return realFetch(input, init)

    const path = url.slice(env.BASE_API_URL.length)
    for (const handler of handlers) {
      const params = handler.match(path)
      if (!params) continue
      const { body, status = 200 } = handler.respond(params)
      await new Promise((resolve) => setTimeout(resolve, latencyMs))
      return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(null, { status: 404, statusText: 'Not Found' })
  }
}
