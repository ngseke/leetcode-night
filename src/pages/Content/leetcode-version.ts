import { waitDOMContentLoaded, waitForElement } from './selector'

export type LeetcodeVersion = '2022' | '2023' | '2023-dynamic-layout'

async function waitLeetcode2023PageLoaded () {
  await waitForElement('#qd-content')
}

export async function detectLeetcodeVersion (): Promise<LeetcodeVersion> {
  await waitDOMContentLoaded()

  const isNextApp = Boolean(
    document.querySelector('head meta[data-next-head]')
  )

  if (isNextApp) {
    await waitLeetcode2023PageLoaded()
    const hasDynamicLayoutClass = Boolean(
      document.querySelector('.flexlayout__layout')
    )
    if (hasDynamicLayoutClass) return '2023-dynamic-layout'
    return '2023'
  }
  return '2022'
}
