import { useState } from 'react'
import type { TreeNode } from '@/types/api'
import { SidebarLayout } from '@/components/layouts/sidebar-layout'
import { TreeNodeItem } from '@/components/features/TreeNodeItem'
import { useTreeNodes } from '@/api/get-tree-nodes'
import { useDnD } from '@/hooks/useDnD'
import { updateTreeNodePosition } from '@/utils/updateTreeNodePosition'

type EntriesTreeProps = {
  onSelectItem: (id: string, item: TreeNode) => void
  selectedItem?: {
    id: string
    item: TreeNode
  }
}

export function EntriesTree({ onSelectItem, selectedItem }: EntriesTreeProps) {
  const OrigTreeNodes = useTreeNodes()
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>()

  const onUpdateItemPosition = (
    draggedItemId: string,
    dropTargetId: string
  ) => {
    const updatedTreeNodes = updateTreeNodePosition({
      dataTree: OrigTreeNodes!.data!,
      itemId: draggedItemId,
      targetId: dropTargetId,
    })

    console.log({ updatedTreeNodes })
    setTreeNodes(updatedTreeNodes)
    return updatedTreeNodes
  }

  const { getDndBindings, ...state } = useDnD({
    onUpdateItemPosition,
  })

  return (
    <SidebarLayout className="shrink-0 p-2 sm:basis-56 sm:p-4">
      <h3 className="mb-4 text-pretty text-2xl font-bold">
        <span className="text-3xl" role="img" aria-hidden="true">
          🪴
        </span>{' '}
        Entries Tree
      </h3>
      <ul className="flex flex-col gap-2">
        {(treeNodes || OrigTreeNodes?.data)?.map((node) => (
          <TreeNodeItem
            node={node}
            key={node?.id}
            onSelectItem={onSelectItem}
            selectedItem={selectedItem?.id}
            draggedItemId={state.draggedItemId}
            getDndBindings={getDndBindings}
            currentDraggedOverId={state.currentDraggedOverId}
            isDragging={state.isDragging}
          />
        ))}
      </ul>
    </SidebarLayout>
  )
}
