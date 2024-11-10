import { useCallback, useId, useState } from 'react'

import { useTreeNodes } from '@/api/get-tree-nodes'
import { TreeNodeItem } from '@/components/features/TreeNodeItem'
import { AppLayout } from '@/components/layouts/app-layout'
import { ContentLayout } from '@/components/layouts/content-layout'
import { SidebarLayout } from '@/components/layouts/sidebar-layout'
import { TreeNode } from '@/types/api'
import { useTreeEntry } from '@/api/get-tree-entry'

export function App() {
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    item: TreeNode
  }>()
  const treeNodes = useTreeNodes()
  const treeEntry = useTreeEntry(selectedItem?.item?.id)

  const id = useId()

  const handleSelectItem = useCallback((id: string, item: TreeNode) => {
    setSelectedItem((prevItem) =>
      id === prevItem?.id ? undefined : { id, item }
    )
  }, [])

  return (
    <AppLayout>
      <ContentLayout className="flex flex-auto">
        <SidebarLayout className="shrink-0 basis-56 p-4">
          <h3 className="mb-2 text-balance text-xl font-bold">
            Entries Directory
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
        <div className="m-4">{treeEntry?.data?.description}</div>
      </ContentLayout>
    </AppLayout>
  )
}
