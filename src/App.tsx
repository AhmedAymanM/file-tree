import { useCallback, useState } from 'react'

import { AppLayout } from '@/components/layouts/app-layout'
import { ContentLayout } from '@/components/layouts/content-layout'
import { EntryDetails } from '@/components/features/EntryDetails'
import type { TreeNode } from '@/types/api'
import { EntriesTree } from './components/features/ENTRIESTree'

export function App() {
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    item: TreeNode
  }>()

  const handleSelectItem = useCallback((id: string, item: TreeNode) => {
    setSelectedItem((prevItem) =>
      id === prevItem?.id ? undefined : { id, item }
    )
  }, [])

  return (
    <AppLayout>
      <ContentLayout className="flex flex-auto">
        <EntriesTree
          onSelectItem={handleSelectItem}
          selectedItem={selectedItem}
        />
        {selectedItem?.item ? (
          <EntryDetails item={selectedItem?.item} />
        ) : (
          <EntryDetails.EmptyState />
        )}
      </ContentLayout>
    </AppLayout>
  )
}
