import { type ElementHandle, type Page } from 'puppeteer'
import { TEST_IDS } from '../../constants'

export async function toggleOptionSwitch (
  popupPage: Page,
  label: string,
  value: boolean
) {
  await popupPage.bringToFront()

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
