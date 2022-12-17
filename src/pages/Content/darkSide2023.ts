import { waitForElement } from './selector'

export const getIsDarkSide2023 = async () => {
  await waitForElement('body')
  const html = await waitForElement('html')
  const isDark = html.classList.contains('dark')
  return isDark
}

export const setIsDarkSide2023 = async (isDark: boolean) => {
  const key = 'lc-dark-side'
  const newValue = isDark ? 'dark' : 'light'

  const event = new StorageEvent('storage', { key, newValue })
  window.dispatchEvent(event)
}

export const onChangeIsDarkSide2023 = (
  onChange: (isDarkSide: boolean) => void
) => {
  const observer = new MutationObserver(async () => {
    onChange(await getIsDarkSide2023())
  })

  const html = document.querySelector('html')

  if (html) {
    observer.observe(html, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }
}
