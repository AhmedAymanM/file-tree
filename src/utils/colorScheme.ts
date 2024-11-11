export enum COLOR_SCHEME {
  light = 'light',
  dark = 'dark',
}

export const getColorScheme = () => {
  const selectedColorScheme = localStorage.getItem('theme') as COLOR_SCHEME

  if (selectedColorScheme) return selectedColorScheme

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return COLOR_SCHEME.dark
  }

  return COLOR_SCHEME.light
}

export const applyColorScheme = (colorScheme?: COLOR_SCHEME) => {
  if (colorScheme) localStorage.setItem('theme', colorScheme)

  const selectedTheme = localStorage.getItem('theme')

  if (selectedTheme)
    return (document.documentElement.dataset.colorScheme = selectedTheme)

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return (document.documentElement.dataset.colorScheme = COLOR_SCHEME.dark)
  }
  return (document.documentElement.dataset.colorScheme = COLOR_SCHEME.light)
}
