import { useState } from 'react'

import { useNodesTree } from './api/get-nodes-tree'
import { useTreeEntry } from './api/get-tree-entry'

export function App() {
  const [count, setCount] = useState(0)
  const nodesTree = useNodesTree()
  const treeEntry = useTreeEntry('9e.A.2')

  console.log({
    nodesTreeData: nodesTree?.data,
    treeEntryData: treeEntry?.data,
  })

  return (
    <div className="bg-white-accent text-black-accent h-svh p-4 text-lg">
      <h1 className="font-bold">Vite + React</h1>
      <div>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="rounded"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}
