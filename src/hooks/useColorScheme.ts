import { useCallback, useState } from 'react'

import {
  applyColorScheme,
  COLOR_SCHEME,
  getColorScheme,
} from '@/utils/colorScheme'

export function useColorScheme() {
  const [colorScheme, setColorMode] = useState(() => getColorScheme())

  const toggle = useCallback(() => {
    const updatedColorScheme =
      colorScheme === COLOR_SCHEME.dark ? COLOR_SCHEME.light : COLOR_SCHEME.dark
    applyColorScheme(updatedColorScheme)
    setColorMode(updatedColorScheme)
  }, [colorScheme])

  return { colorScheme, toggle }
}
