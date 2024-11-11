import { useColorScheme } from '@/hooks/useColorScheme'
import { COLOR_SCHEME } from '@/utils/colorScheme'

export const ColorModeSwitch = () => {
  const { colorScheme, toggle: toggleColorScheme } = useColorScheme()

  const isDarkMode = colorScheme === COLOR_SCHEME.dark

  return (
    <button
      aria-label={isDarkMode ? 'toggle to light mode' : 'toggle to dark mode'}
      className="size-14 rounded-full border-2 border-gray-300 bg-black/5 p-2 outline-none hover:bg-black/10 focus:ring-2 focus:ring-offset-2 dark:border-gray-600 dark:bg-white/5 dark:hover:bg-white/10"
      onClick={toggleColorScheme}
    >
      <span className="text-4xl" role="img" aria-hidden="true">
        {isDarkMode ? '🌞' : '🌚'}
      </span>
    </button>
  )
}
