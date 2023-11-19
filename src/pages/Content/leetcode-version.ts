import { waitForElement } from './selector'

export type LeetcodeVersion = '2022' | '2023'

export async function detectLeetcodeVersion (): Promise<LeetcodeVersion> {
  await waitForElement('body')
  const isNextApp = Boolean(
    document.querySelector('head meta[name="next-head-count"]')
  )

  if (isNextApp) return '2023'
  return '2022'
}
