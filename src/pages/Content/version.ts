import { waitForElement } from './selector'

export async function detectVersion () {
  await waitForElement('body')
  const isNextApp = Boolean(
    document.querySelector('head meta[name="next-head-count"]')
  )

  if (isNextApp) return 2023
  return 2022
}
