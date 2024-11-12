import { updateTreeNodePosition } from '../updateTreeNodePosition'

const getTestTreeData = () => [
  {
    id: '1',
    label: 'Node 1',
    children: [
      {
        id: '2',
        label: 'Node 2',
      },
      {
        id: '3',
        label: 'Node 3',
        children: [
          {
            id: '4',
            label: 'Node 4',
          },
        ],
      },
    ],
  },
  {
    id: '5',
    label: 'Node 5',
  },
]

describe('updateTreeNodesSorting', () => {
  test('should not update the tree nodes sorting if the item is not found', () => {
    const testNodes = getTestTreeData()
    const updatedTreeNodes = updateTreeNodePosition({
      dataTree: testNodes,
      itemId: '9',
      targetId: '4',
    })

    expect(updatedTreeNodes).toEqual(testNodes)
  })

  test('should handle sorting correctly if target is a parent node', () => {
    const updatedTreeNodes = updateTreeNodePosition({
      dataTree: getTestTreeData(),
      itemId: '2',
      targetId: '4',
    })

    expect(updatedTreeNodes).toEqual([
      {
        id: '1',
        label: 'Node 1',
        children: [
          {
            id: '3',
            label: 'Node 3',
            children: [
              {
                id: '4',
                label: 'Node 4',
              },
              {
                id: '2',
                label: 'Node 2',
              },
            ],
          },
        ],
      },
      {
        id: '5',
        label: 'Node 5',
      },
    ])
  })
  test('should handle sorting correctly if target is a leaf node ', () => {
    const updatedTreeNodes = updateTreeNodePosition({
      dataTree: getTestTreeData(),
      itemId: '3',
      targetId: '5',
    })

    expect(updatedTreeNodes).toEqual([
      {
        id: '1',
        label: 'Node 1',
        children: [
          {
            id: '2',
            label: 'Node 2',
          },
        ],
      },
      {
        id: '5',
        label: 'Node 5',
      },
      {
        id: '3',
        label: 'Node 3',
        children: [
          {
            id: '4',
            label: 'Node 4',
          },
        ],
      },
    ])
  })
})
