import { z } from 'zod'

import type { TreeNode } from '@/types/api'

const treeNodeSchema: z.ZodType<TreeNode> = z
  .union([
    z.object({ id: z.string() }),
    z.object({ children: z.lazy(() => treeNodeSchema.array()) }),
  ])
  .and(z.object({ label: z.string() }))

export const treeNodesSchema = z.array(treeNodeSchema)

export const treeEntrySchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  createdBy: z.string().email(),
  lastModifiedAt: z.string().datetime(),
  lastModifiedBy: z.string().email(),
  description: z.string(),
})
