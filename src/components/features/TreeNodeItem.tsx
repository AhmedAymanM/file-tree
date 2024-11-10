import {
  useCallback,
  useId,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'

import type { TreeNode } from '@/types/api'
import { cn } from '@/utils/cn'

type TreeNodeItemProps = {
  node: TreeNode
  onHighlight: (id: string) => void
  highlightedItem?: string
}

export function TreeNodeItem({
  node,
  onHighlight,
  highlightedItem,
}: TreeNodeItemProps) {
  const id = useId()

  const ItemId = node.id ?? id + node.label

  const handleHighlight = useCallback(
    (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation()
      onHighlight(ItemId)
    },
    [ItemId, onHighlight]
  )

  return (
    <li className={cn(ItemId === highlightedItem && 'bg-gray-100')}>
      <div
        role="button"
        onClick={handleHighlight}
        onKeyUp={handleHighlight}
        tabIndex={0}
      >
        <span className="flex items-center gap-1.5 py-1">{node.label}</span>
        {node?.children?.length && (
          <ul className="pl-6">
            {node?.children?.map((currentNode) => (
              <TreeNodeItem
                node={currentNode}
                key={currentNode?.id ?? id + currentNode.label}
                onHighlight={onHighlight}
                highlightedItem={highlightedItem}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}
