import type { MockHandler } from '@/api/mockFetch'
import type { TreeEntry } from '@/types/api'

const entry = (id: string, description: string): TreeEntry => ({
  id,
  createdAt: '2024-01-15T09:30:00.000Z',
  createdBy: 'alice@example.com',
  lastModifiedAt: '2024-03-02T14:05:00.000Z',
  lastModifiedBy: 'bob@example.com',
  description,
})

export const treeEntriesStub: Record<string, TreeEntry> = {
  documents: entry('documents', 'All my documents.'),
  resume: entry('resume', 'Latest CV.'),
  projects: entry('projects', 'Side projects.'),
  mobile: entry('mobile', 'Mobile app prototype.'),
  pictures: entry('pictures', 'Photo library.'),
  holiday: entry('holiday', 'Summer holiday photos.'),
  notes: entry('notes', 'Quick notes.'),
}

export const getTreeEntryMock: MockHandler = {
  match: (path) => path.match(/^\/entries\/(.+)\.json$/)?.slice(1) ?? null,
  respond: ([id]) => {
    const found = treeEntriesStub[id]
    // Generated ids (nodes without an id) have no stub: fall back to a generic entry.
    return { body: found ?? entry(id, 'Generated stub entry.') }
  },
}
