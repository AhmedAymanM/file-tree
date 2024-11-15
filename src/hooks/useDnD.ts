// README: I would potentially consider using a library like react-dnd, or
// react-aria before implementing this. as they should handle all the
// complexities of drag and drop, and provide a more robust and reliable
// implementation. accessibility and keyboard navigation are also important
// aspects to consider.

import { useCallback, DragEvent, useReducer } from 'react'

export type DnDBindings = {
  draggable: boolean
  onDragEnter: (e: DragEvent) => void
  onDragStart: (e: DragEvent) => void
  onDragOver: (e: DragEvent) => void
  onDrop: (e: DragEvent) => void
  onDragEnd?: () => void
}

enum ActionTypes {
  drag_item = 'drag_item',
  drop_item = 'drop_item',
  drag_over_item = 'drag_over_item',
}

type Action = {
  type: ActionTypes
  id?: string
}

type State = {
  draggedItemId: string | undefined
  dropTargetId: string | undefined
  currentDraggedOverId: string | undefined
  isDragging: boolean
}

const initialState = {
  draggedItemId: undefined,
  dropTargetId: undefined,
  currentDraggedOverId: undefined,
  isDragging: false,
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionTypes.drag_item: {
      return {
        ...initialState,
        isDragging: true,
        draggedItemId: action.id,
      }
    }
    case ActionTypes.drag_over_item: {
      return {
        ...state,
        currentDraggedOverId: action.id,
      }
    }
    case ActionTypes.drop_item: {
      return {
        ...state,
        currentDraggedOverId: initialState.currentDraggedOverId,
        dropTargetId: action.id,
        isDragging: false,
      }
    }
  }
}

export function useDnD({
  onDrop,
}: {
  onDrop?: (draggedItemId: string, dropTargetId: string) => void
}) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleDragStart = useCallback((e: DragEvent, id: string) => {
    e.stopPropagation()
    dispatch({ type: ActionTypes.drag_item, id })
  }, [])

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault() // Required to allow dropping
  }, [])

  const handleDragEnter = useCallback((e: DragEvent, id: string) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch({ type: ActionTypes.drag_over_item, id })
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent, id: string) => {
      e.stopPropagation()
      e.preventDefault()

      dispatch({ type: ActionTypes.drop_item, id })
      if (state.draggedItemId && state.draggedItemId !== id) {
        onDrop?.(state.draggedItemId, id)
      }
    },
    [onDrop, state.draggedItemId]
  )

  // README: we should have some mechanism to prevent overriding key bindings
  // applied by developers, to avoid any potential conflicts and bugs.
  // for the sake of simplicity, this is not implemented

  const getDndBindings = useCallback(
    (id: string): DnDBindings => {
      return {
        draggable: true,
        onDragStart: (e: DragEvent) => handleDragStart(e, id),
        onDragOver: (e: DragEvent) => handleDragOver(e),
        onDragEnter: (e: DragEvent) => handleDragEnter(e, id),
        onDrop: (e: DragEvent) => handleDrop(e, id),
      }
    },
    [handleDragStart, handleDragOver, handleDragEnter, handleDrop]
  )

  return { ...state, getDndBindings }
}
