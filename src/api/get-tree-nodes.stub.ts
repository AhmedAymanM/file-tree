import type { MockHandler } from '@/api/mockFetch'

// Some nodes intentionally have no `id`: getTreeNodes generates them.
export const treeNodesStub = [
  {
    label: 'Documents',
    id: 'documents',
    children: [
      { label: 'Resume', id: 'resume' },
      {
        label: 'Projects',
        id: 'projects',
        children: [{ label: 'Website' }, { label: 'Mobile app', id: 'mobile' }],
      },
    ],
  },
  {
    label: 'Pictures',
    id: 'pictures',
    children: [{ label: 'Holiday', id: 'holiday' }, { label: 'Family' }],
  },
  { label: 'Notes', id: 'notes' },
]

export const getTreeNodesMock: MockHandler = {
  match: (path) => (path === '/data.json' ? [] : null),
  respond: () => ({ body: treeNodesStub }),
}
