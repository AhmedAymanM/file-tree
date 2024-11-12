// TODO: use data-[] for highlighting active tree node

import { useCallback, useState, type MouseEvent, type FocusEvent } from 'react'

import type { TreeNode } from '@/types/api'
import { cn } from '@/utils/cn'

type TreeNodeItemProps = {
  node: TreeNode
  onSelectItem: (id: string, item: TreeNode) => void
  selectedItem?: string
}

export function TreeNodeItem({
  node,
  onSelectItem,
  selectedItem,
}: TreeNodeItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const isFile = !node.children

  const isSelectedFile = node.id && node.id === selectedItem

  const handleSelectItem = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onSelectItem(node.id, node)
    },
    [node, onSelectItem]
  )

  const handleItemHover = useCallback(
    (e: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setIsHovered(true)
    },
    []
  )

  const handleItemBlur = useCallback(
    (e: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setIsHovered(false)
    },
    []
  )
  const handleToggleFolder = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }, [])

  return (
    <li
      className={cn(
        'flex flex-col gap-1.5 rounded-lg',
        node.id === selectedItem &&
          'ring-primary/80 dark:ring-primary/60 shadow-xl ring-1',
        isHovered &&
          'ring-primary/30 dark:ring-primary/40 shadow-sm ring-2 ring-offset-4 ring-offset-[#edeef0] dark:ring-offset-[#232c39]'
      )}
    >
      {isFile ? (
        <button
          aria-label={isSelectedFile ? 'close entry' : 'open entry'}
          onClick={handleSelectItem}
          className={cn(
            'flex gap-1 rounded-lg px-2',
            isSelectedFile &&
              'bg-primary dark:bg-primary/80 text-white shadow-md',
            'hover:bg-primary/30 dark:hover:bg-primary/65 focus:bg-primary/30 hover:text-black hover:shadow-sm focus:text-black focus:shadow-sm dark:hover:text-white dark:focus:text-white'
          )}
        >
          <span role="img" aria-hidden={true}>
            📝
          </span>{' '}
          <span>{node.label}</span>
        </button>
      ) : (
        <button
          aria-label={isOpen ? 'collapse directory' : 'open directory'}
          onClick={handleToggleFolder}
          onMouseOver={handleItemHover}
          onFocus={handleItemHover}
          onMouseOut={handleItemBlur}
          onBlur={handleItemBlur}
          className={cn(
            'flex gap-1 rounded-lg px-2',
            isSelectedFile &&
              'bg-primary dark:bg-primary/80 text-white shadow-md',

            'dark:hover:bg-primary/65 hover:bg-primary/30 focus:bg-primary/30 hover:text-black hover:shadow-sm focus:text-black focus:shadow-sm dark:hover:text-white dark:focus:text-white'
          )}
        >
          <span role="img" aria-hidden={true}>
            {isOpen ? '📂' : '📁'}
          </span>{' '}
          <span>{node.label}</span>
        </button>
      )}
      {node?.children?.length && isOpen && (
        <ul className="flex flex-col gap-1.5 pl-5">
          {node?.children?.map((childNode) => (
            <TreeNodeItem
              node={childNode}
              key={childNode?.id}
              onSelectItem={onSelectItem}
              selectedItem={selectedItem}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
