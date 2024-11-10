import { useTreeEntry } from '@/api/get-tree-entry'
import { TreeNode } from '@/types/api'

type EntryDetailsProps = {
  item: TreeNode
}

export function EntryDetails({ item }: EntryDetailsProps) {
  const entry = useTreeEntry(item.id!)

  return (
    <main className="flex grow flex-col gap-4 px-6 py-10">
      <h2 className="text-primary text-3xl font-black">{item?.label}</h2>
      <p className="text-balance text-lg text-black/70">
        {entry?.data?.description}
      </p>
    </main>
  )
}
