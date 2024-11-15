import { ReactNode, useCallback, useState } from 'react'

import type { TreeNode } from '@/types/api'
import { SidebarLayout } from '@/components/layouts/sidebar-layout'
import { TreeNodeItem } from '@/components/features/TreeNodeItem'
import { Message } from '@/components//ui/message'
import { useTreeNodes } from '@/api/get-tree-nodes'
import { useDnD } from '@/hooks/useDnD'
import { updateTreeNodePosition } from '@/utils/updateTreeNodePosition'
import { STATUS } from '@/hooks/useAsync'
import { Subtitle } from '../ui/typography'

type EntriesTreeProps = {
  onSelectItem: (id: string, item: TreeNode) => void
  selectedItem?: {
    id: string
    item: TreeNode
  }
}

function EntriesTree({
  onSelectItem,
  selectedItem,
  treeNodes: treeNodesProp,
}: EntriesTreeProps & { treeNodes: TreeNode[] }) {
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>(treeNodesProp)

  const onUpdateItemPosition = useCallback(
    (draggedItemId: string, dropTargetId: string) => {
      if (confirm('Confirm drop item here?')) {
        const updatedTreeNodes = updateTreeNodePosition({
          dataTree: treeNodes,
          itemId: draggedItemId,
          targetId: dropTargetId,
        })
        console.log({ updatedTreeNodes })
        setTreeNodes(updatedTreeNodes)
      }
    },
    [treeNodes]
  )

  const { getDndBindings, ...state } = useDnD({
    onDrop: onUpdateItemPosition,
  })

  return (
    <Container>
      <ul className="flex flex-col gap-2">
        {treeNodes.map((node) => (
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
      <p className="mt-auto text-balance p-1 text-center text-sm font-medium text-black/60 dark:text-white/70">
        Drag and drop entries to reorder them!{' '}
        <span className="text-white">😉</span>
      </p>
    </Container>
  )
}

function EntriesTreeLoader({ onSelectItem, selectedItem }: EntriesTreeProps) {
  const treeNodes = useTreeNodes()

  if (treeNodes.status === STATUS.ERROR) {
    return (
      <Container>
        <Message title="Something went wrong... 😔" className="my-auto">
          Please try again!
        </Message>
      </Container>
    )
  }

  if (
    !treeNodes.data &&
    (treeNodes.status === STATUS.LOADING || treeNodes.status === STATUS.IDLE)
  ) {
    return (
      <Container>
        <Placeholder />
      </Container>
    )
  }

  return (
    <EntriesTree
      onSelectItem={onSelectItem}
      selectedItem={selectedItem}
      treeNodes={treeNodes.data!}
    />
  )
}

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarLayout className="flex shrink-0 flex-col p-2 sm:basis-64 sm:p-4">
      <h3 className="mb-4 text-pretty text-2xl font-bold">
        <span className="text-3xl" role="img" aria-hidden="true">
          🪴
        </span>{' '}
        Entries Tree
      </h3>
      {children}
    </SidebarLayout>
  )
}

const Placeholder = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="my-2 h-4 rounded bg-gray-200" />
        <div className="my-2 h-4 rounded bg-gray-200" />
        <div className="my-2 h-4 rounded bg-gray-200" />
        <div className="my-2 h-4 rounded bg-gray-200" />
        <div className="my-2 h-4 rounded bg-gray-200" />
        <div className="my-2 h-4 rounded bg-gray-200" />
        <div className="my-2 h-4 rounded bg-gray-200" />
        <div className="my-2 h-4 rounded bg-gray-200" />
        <div className="my-2 h-4 rounded bg-gray-200" />
        <div className="my-2 h-4 rounded bg-gray-200" />
      </div>
    </div>
  )
}

export { EntriesTreeLoader as EntriesTree }
