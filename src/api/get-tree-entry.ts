import { useCallback } from 'react'

import { api } from '@/utils/api'
import { useAsync } from '@/hooks/useAsync'
import { treeEntrySchema } from '@/schemas/api'
import type { TreeEntry } from '@/types/api'

export const PROJECTS_PER_PAGE = 5

export const getTreeEntry = async (id: string) => {
  const data = await api.get<TreeEntry>(`/entries/${id}.json`)

  return treeEntrySchema.parse(data) ?? {}
}

export const useTreeEntry = (id: string) => {
  const memoizedGetNodesTree = useCallback(() => getTreeEntry(id), [id])

  return useAsync<Awaited<ReturnType<typeof getTreeEntry>>>(
    memoizedGetNodesTree
  )
}
