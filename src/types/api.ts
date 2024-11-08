import { z } from 'zod'

import { treeEntrySchema } from '@/schemas/api'

export type TreeNode = {
  label: string
} & (
  | {
      children: TreeNode[]
    }
  | {
      id: string
    }
)

export type TreeEntry = z.TypeOf<typeof treeEntrySchema>
