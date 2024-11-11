import { applyColorScheme, COLOR_SCHEME, getColorScheme } from '../colorScheme'

const getColorSchemeFromLocalStorage = () => {
  return localStorage.getItem('theme')
}

describe('colorScheme utils', () => {
  test('dark mode is applied', () => {
    applyColorScheme(COLOR_SCHEME.dark)

    expect(getColorScheme()).toBe(COLOR_SCHEME.dark)
    expect(document.documentElement.dataset.colorScheme).toBe(COLOR_SCHEME.dark)
  })

  test('light mode is applied', () => {
    applyColorScheme(COLOR_SCHEME.light)

    expect(getColorScheme()).toBe(COLOR_SCHEME.light)
    expect(document.documentElement.dataset.colorScheme).toBe(
      COLOR_SCHEME.light
    )
  })

  test('color scheme is persisted', () => {
    applyColorScheme(COLOR_SCHEME.dark)

    expect(getColorScheme()).toBe(COLOR_SCHEME.dark)
    expect(getColorSchemeFromLocalStorage()).toBe(COLOR_SCHEME.dark)

    applyColorScheme(COLOR_SCHEME.light)

    expect(getColorScheme()).toBe(COLOR_SCHEME.light)
    expect(getColorSchemeFromLocalStorage()).toBe(COLOR_SCHEME.light)
  })
})
