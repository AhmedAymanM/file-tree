import { api } from '@/utils/api'
import { useAsync } from '@/hooks/useAsync'
import { treeNodesSchema } from '@/schemas/api'
import type { TreeNode } from '@/types/api'

export const PROJECTS_PER_PAGE = 5

export const getTreeNodes = async () => {
  const data = await api.get<TreeNode[]>('/data.json')

  return treeNodesSchema.parse(data) ?? []
}

export const useTreeNodes = () => {
  return useAsync<Awaited<ReturnType<typeof getTreeNodes>>>(getTreeNodes)
}
