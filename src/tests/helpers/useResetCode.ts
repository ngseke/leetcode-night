import { type Page } from 'puppeteer'
import { waitUntil } from './waitUntil'
import { sleep } from './sleep'

export function useResetCode ({
  getPage,
  toggleOptionSwitch,
}: {
  getPage: () => Promise<Page>,
  toggleOptionSwitch: (label: string, value: boolean) => Promise<void>,
}) {
  const optionLabel = 'Auto Reset Code'
  const customCode = 'test\n'.repeat(10)

  async function assertResetCode () {
    const page = await getPage()

    async function selectFirstLine () {
      await waitUntil(async () => (
        (await page.$x('//*[@class="line-numbers" and contains(., "6")]'))[0]
      ))

      const firstLine = await page.waitForSelector('.view-line')
      if (!firstLine) throw new Error()

      return firstLine
    }

    async function typeInEditor () {
      const firstLine = await selectFirstLine()

      await firstLine.click({ count: 4 })
      await firstLine.press('Backspace')
      await firstLine.type(customCode, { delay: 10 })
      await sleep(300)
    }

    await typeInEditor()
    await page.reload({ waitUntil: 'networkidle2' })

    async function getFirstLineText () {
      const firstLine = await selectFirstLine()
      return await firstLine.evaluate((element) => element.textContent)
    }

    expect(await getFirstLineText()).toBe('test')

    await toggleOptionSwitch(optionLabel, true)

    await page.bringToFront()
    expect(await getFirstLineText()).toBe('test')

    await page.reload({ waitUntil: 'networkidle2' })
    await sleep(1000)
    expect(await getFirstLineText()).not.toBe('test')
  }

  return {
    assertResetCode,
  }
}
