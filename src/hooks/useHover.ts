import { FocusEvent, MouseEvent, useCallback, useState } from 'react'

export function useHover() {
  const [isHovered, setIsHovered] = useState(false)

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

  // README: we should have some mechanism to prevent overriding key bindings
  // applied by developers, to avoid any potential conflicts and bugs.
  // for the sake of simplicity, this is not implemented

  const hoverBindings = {
    onMouseOver: handleItemHover,
    onFocus: handleItemHover,
    onMouseOut: handleItemBlur,
    onBlur: handleItemBlur,
  }

  return { hoverBindings, isHovered }
}
