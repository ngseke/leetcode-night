import { type ElementHandle, type Page } from 'puppeteer'
import { TEST_IDS } from '../../constants'

export function useOptions ({ getPopupPage }: {
  getPopupPage: () => Promise<Page>,
}) {
  async function toggleOptionSwitch (label: string, value: boolean) {
    const popupPage = await getPopupPage()

    const optionsTab = await popupPage.$(`[data-testid=${TEST_IDS.optionsTab}]`)
    await optionsTab?.click()

    const checkbox = await popupPage.waitForXPath(
        `//label[contains(., '${label}')]/input`
    ) as ElementHandle<Element>

    const isChecked = await checkbox.evaluate(
      (checkbox) => (checkbox as HTMLInputElement).checked
    )

    if (isChecked === value) return

    await checkbox.click()
  }

  return {
    toggleOptionSwitch,
  }
}
