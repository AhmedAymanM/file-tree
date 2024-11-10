import { type ReactNode } from 'react'

import { useTreeEntry } from '@/api/get-tree-entry'
import { getFormattedDate } from '@/utils/getFormattedDate'
import { STATUS } from '@/hooks/useAsync'
import { Message } from '@/components/ui/message'
import { Heading, Subtitle } from '@/components/ui/typography'
import type { TreeNode } from '@/types/api'

type EntryDetailsProps = {
  item: TreeNode
}

export function EntryDetails({ item }: EntryDetailsProps) {
  const entry = useTreeEntry(item.id!)

  if (entry.status === STATUS.ERROR) {
    console.log({ error: entry.error })
    return (
      <Container>
        <Message title="Something went wrong... 😔" className="my-auto">
          Please try again!
        </Message>
      </Container>
    )
  }

  if (
    !entry.data &&
    (entry.status === STATUS.LOADING || entry.status === STATUS.IDLE)
  ) {
    return (
      <Container>
        <Placeholder />
      </Container>
    )
  }

  const createdAt = entry?.data?.createdAt
    ? getFormattedDate(entry?.data?.createdAt)
    : ''

  return (
    <Container>
      <Heading as="h1">{item?.label}</Heading>
      <Subtitle className="pb-1">
        By <span className="text-primary">{entry.data?.createdBy}</span> @{' '}
        <span className="tracking-tighter">{createdAt}</span>
      </Subtitle>
      <p className="text-balance text-lg text-black/70">
        {entry?.data?.description}
      </p>
    </Container>
  )
}

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex grow flex-col gap-2 px-4 py-2 sm:gap-4 sm:px-6 sm:py-10">
      {children}
    </main>
  )
}

const Placeholder = () => {
  return (
    <div className="flex max-h-fit min-h-28 w-full animate-pulse flex-col gap-4 overflow-hidden rounded-md">
      <div className="h-8 w-1/3 bg-gray-200/40" />

      <div className="my-auto flex flex-col gap-2 py-1">
        <div className="h-4 w-full rounded bg-gray-200/40" />
        <div className="h-4 w-full rounded bg-gray-200/40" />
        <div className="h-4 w-full rounded bg-gray-200/40" />
        <div className="h-4 w-full rounded bg-gray-200/40" />
        <div className="h-4 w-full rounded bg-gray-200/40" />
        <div className="h-4 w-full rounded bg-gray-200/40" />
        <div className="h-4 w-full rounded bg-gray-200/40" />
        <div className="h-4 w-full rounded bg-gray-200/40" />
      </div>
      <div className="h-4 w-1/2 bg-gray-200/40 pt-3" />
    </div>
  )
}

const EmptyState = () => {
  return (
    <Container>
      <Message title=" No entry selected... 💔" className="my-auto">
        Please select an entry 📝 from the{' '}
        <span className="font-semibold">entries directory</span>, to view its
        details.
      </Message>
    </Container>
  )
}

EntryDetails.EmptyState = EmptyState
