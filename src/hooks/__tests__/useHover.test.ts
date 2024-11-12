import { act, renderHook } from '@testing-library/react'
import { useHover } from '../useHover'

describe('useHover hook', () => {
  test('returns initial value', () => {
    const { result } = renderHook(() => useHover())

    expect(result.current.isHovered).toBe(false)
  })

  test('returns hovered state when hovering', () => {
    const { result } = renderHook(() => useHover())

    expect(result.current.isHovered).toBe(false)

    act(() => {
      /* @ts-expect-error bindings expect MouseEvent<ButtonElement> but got MouseEvent */
      result.current.hoverBindings.onMouseOver(new MouseEvent('mouseover'))
    })

    expect(result.current.isHovered).toBe(true)

    act(() => {
      /* @ts-expect-error bindings expect MouseEvent<ButtonElement> but got MouseEvent */
      result.current.hoverBindings.onMouseOut(new MouseEvent('mouseout'))
    })

    expect(result.current.isHovered).toBe(false)
  })

  test('returns hovered state when focused ', () => {
    const { result } = renderHook(() => useHover())

    expect(result.current.isHovered).toBe(false)

    act(() => {
      /* @ts-expect-error bindings expect MouseEvent<ButtonElement> but got MouseEvent */
      result.current.hoverBindings.onFocus(new FocusEvent('focus'))
    })

    expect(result.current.isHovered).toBe(true)

    act(() => {
      /* @ts-expect-error bindings expect MouseEvent<ButtonElement> but got MouseEvent */
      result.current.hoverBindings.onBlur(new FocusEvent('blur'))
    })

    expect(result.current.isHovered).toBe(false)
  })
})
