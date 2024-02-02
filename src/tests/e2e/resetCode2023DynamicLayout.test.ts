import { useBrowserAndPages } from '../helpers/puppeteer'
import { sleep } from '../helpers/sleep'
import { useOptions } from '../helpers/useOptions'
import { waitFor } from '../helpers/waitFor'

describe('[2023 Dynamic Layout] Reset code', () => {
  const optionLabel = 'Auto Reset Code'
  const customCode = 'test\n'.repeat(10)

  const { getPage, getPopupPage } =
    useBrowserAndPages({ leetcodeVersion: '2023-dynamic-layout' })

  const { toggleOptionSwitch } = useOptions({ getPopupPage })

  async function selectFirstLine () {
    const page = await getPage()
    await waitFor(async () => (
      !(await page.$x('//*[@class="line-numbers" and contains(., "6")]'))[0]
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

  test('should reset code when entering the page', async () => {
    const page = await getPage()

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
  })
})
