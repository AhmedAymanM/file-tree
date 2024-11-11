import { useCallback, useId, useState } from 'react'

import { useTreeNodes } from '@/api/get-tree-nodes'
import { AppLayout } from '@/components/layouts/app-layout'
import { ContentLayout } from '@/components/layouts/content-layout'
import { SidebarLayout } from '@/components/layouts/sidebar-layout'
import { EntryDetails } from '@/components/features/EntryDetails'
import { TreeNodeItem } from '@/components/features/TreeNodeItem'
import type { TreeNode } from '@/types/api'

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
    <AppLayout>
      <ContentLayout className="flex flex-auto">
        <SidebarLayout className="shrink-0 p-2 sm:basis-56 sm:p-4">
          <h3 className="mb-4 text-pretty text-2xl font-bold">
            <span className="text-3xl" role="img" aria-hidden="true">
              🪴
            </span>{' '}
            Entries Tree
          </h3>
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
        </SidebarLayout>
        {selectedItem?.item ? (
          <EntryDetails item={selectedItem?.item} />
        ) : (
          <EntryDetails.EmptyState />
        )}
      </ContentLayout>
    </AppLayout>
  )
}
