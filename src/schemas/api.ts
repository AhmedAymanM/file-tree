import { z } from 'zod'

import type { TreeNode } from '@/types/api'

const treeNodeSchema: z.ZodType<TreeNode> = z.object({
  label: z.string(),
  id: z.string(),
  children: z.lazy(() => treeNodeSchema.array()).optional(),
})

export const treeNodesSchema = z.array(treeNodeSchema)

export const treeEntrySchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  createdBy: z.string().email(),
  lastModifiedAt: z.string().datetime(),
  lastModifiedBy: z.string().email(),
  description: z.string(),
})
