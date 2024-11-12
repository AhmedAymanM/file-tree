import { api } from '@/utils/api'
import { generateUUID } from '@/utils/generateUUID'
import { useAsync } from '@/hooks/useAsync'
import { treeNodesSchema } from '@/schemas/api'
import type { TreeNode } from '@/types/api'

export const PROJECTS_PER_PAGE = 5

type ReturnedData = Omit<TreeNode, 'id'> & { id?: string }

export const getTreeNodes = async () => {
  const data = await api.get<ReturnedData[]>('/data.json')

  return treeNodesSchema.parse(addIdIfNotExist(data)) ?? []
}

export const useTreeNodes = () => {
  return useAsync<Awaited<ReturnType<typeof getTreeNodes>>>(getTreeNodes)
}

function addIdIfNotExist(tree: ReturnedData[]): TreeNode[] {
  return tree.map((childNode) => ({
    ...childNode,
    id: childNode.id ?? generateUUID(),
    ...(childNode.children
      ? {
          children: addIdIfNotExist(childNode.children),
        }
      : {}),
  }))
}
