import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithRef,
  type MouseEvent,
} from 'react'
import { cn } from '@/utils/cn'
import { useHover } from '@/hooks/useHover'
import type { TreeNode } from '@/types/api'
import type { DnDBindings } from '@/hooks/useDnD'

type TreeNodeItemProps = {
  node: TreeNode
  onSelectItem: (id: string, item: TreeNode) => void
  getDndBindings: (id: string) => DnDBindings
  selectedItem?: string
  draggedItemId: string | undefined
  currentDraggedOverId: string | undefined
  isDragging: boolean
}

export function TreeNodeItem({
  node,
  onSelectItem,
  selectedItem,
  getDndBindings,
  draggedItemId,
  currentDraggedOverId,
  isDragging,
}: TreeNodeItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { hoverBindings, isHovered } = useHover()

  const isFile = !node.children
  const isItemSelected = !!node.id && node.id === selectedItem
  const isDragged = isDragging && node.id === draggedItemId
  const isDraggingOverIt = node.id === currentDraggedOverId

  useEffect(() => {
    if (isDraggingOverIt && !isOpen) {
      setIsOpen(true)
    }
  }, [isDragged, isDraggingOverIt, isOpen])

  const handleSelectItem = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onSelectItem(node.id, node)
    },
    [node, onSelectItem]
  )

  const dndBindings = useMemo(
    () => getDndBindings(node.id),
    [getDndBindings, node.id]
  )

  const handleToggleFolder = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }, [])

  return (
    <li
      {...dndBindings}
      className={cn(
        'm-1 flex flex-col gap-1.5 rounded-lg',
        node.id === selectedItem &&
          'ring-primary/80 dark:ring-primary/60 shadow-xl ring-1',
        isHovered &&
          'ring-primary/30 dark:ring-primary/40 shadow-sm ring-2 ring-offset-4 ring-offset-[#edeef0] dark:ring-offset-[#232c39]',
        isDragged && 'opacity-50', // Add opacity style when dragging
        isDraggingOverIt && 'ring-2 ring-blue-400'
      )}
      data-id={node.id}
    >
      {isFile ? (
        <ItemTitleButton
          onClick={handleSelectItem}
          isItemSelected={isItemSelected}
        >
          <span
            role="img"
            aria-label={isItemSelected ? 'close entry' : 'open entry'}
            // to make sure the icon doesn't have any transparency applied
            className="text-white"
          >
            📝
          </span>{' '}
          <span>{node.label}</span>
        </ItemTitleButton>
      ) : (
        <ItemTitleButton
          onClick={handleToggleFolder}
          isItemSelected={isItemSelected}
          {...hoverBindings}
        >
          <span
            role="img"
            aria-label={isOpen ? 'close directory' : 'open directory'}
          >
            {isOpen ? '📂' : '📁'}
          </span>{' '}
          <span>{node.label}</span>
        </ItemTitleButton>
      )}
      {node?.children?.length && isOpen ? (
        <ul className="flex flex-col gap-1.5 pl-5">
          {node.children.map((childNode) => (
            <TreeNodeItem
              key={childNode.id}
              node={childNode}
              onSelectItem={onSelectItem}
              selectedItem={selectedItem}
              getDndBindings={getDndBindings}
              draggedItemId={draggedItemId}
              isDragging={isDragging}
              currentDraggedOverId={currentDraggedOverId}
            />
          ))}
        </ul>
      ) : undefined}
    </li>
  )
}

const ItemTitleButton = ({
  isItemSelected,
  ...props
}: {
  isItemSelected: boolean
} & ComponentPropsWithRef<'button'>) => {
  return (
    <button
      className={cn(
        isItemSelected && 'bg-primary dark:bg-primary/80 text-white shadow-md',
        'hover:bg-primary/30 dark:hover:bg-primary/65 focus:bg-primary/30 flex gap-1 rounded-lg px-2 hover:text-black hover:shadow-sm focus:text-black focus:shadow-sm dark:hover:text-white dark:focus:text-white'
      )}
      {...props}
    />
  )
}
