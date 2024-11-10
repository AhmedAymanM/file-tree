import { useCallback, useId, useState } from 'react'

import { useTreeNodes } from '@/api/get-tree-nodes'
import { TreeNodeItem } from '@/components/features/TreeNodeItem'
import { TreeNode } from '@/types/api'

export function App() {
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    item: TreeNode
  }>()
  const treeNodes = useTreeNodes()

  const id = useId()

  const handleSelectItem = useCallback((id: string, item: TreeNode) => {
    setSelectedItem((prevItem) =>
      id === prevItem?.id ? undefined : { id, item }
    )
  }, [])

  return (
          <ul className="flex flex-col gap-2">
            {treeNodes?.data?.map((node) => (
              <TreeNodeItem
                node={node}
                key={node?.id ?? id + node.label}
                onSelectItem={handleSelectItem}
                selectedItem={selectedItem?.id}
              />
            ))}
          </ul>
  )
}
