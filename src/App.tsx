import { useCallback, useId, useState } from 'react'

import { useTreeNodes } from './api/get-tree-nodes'
// import { useTreeEntry } from './api/get-tree-entry'
import { TreeNodeItem } from './components/features/TreeNodeItem'

export function App() {
  const treeNodes = useTreeNodes()
  // const treeEntry = useTreeEntry('9e.A.2')
  const [highlightedItem, setHighlightedItem] = useState<string>()

  const id = useId()

  const handleToggleHighlight = useCallback(
    (id: string) => {
      setHighlightedItem(id === highlightedItem ? undefined : id)
    },
    [highlightedItem]
  )

  return (
    <div className="h-svh p-4 text-lg">
      <ul>
        {treeNodes?.data?.map((node) => (
          <TreeNodeItem
            node={node}
            key={node?.id ?? id + node.label}
            onHighlight={handleToggleHighlight}
            highlightedItem={highlightedItem}
          />
        ))}
      </ul>
    </div>
  )
}
