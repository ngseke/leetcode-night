import { type ElementHandle, type Page } from 'puppeteer'
import { sleep } from './sleep'
import { waitUntil } from './waitUntil'

export function usePagination2023 ({ getPage }: {
  getPage: () => Promise<Page>,
}) {
  async function getPreviousAndNextLink () {
    const page = await getPage()

    const [previousLink, nextLink] = await page.$x(`
      //nav//*[contains(.,'Problem List')]
      //a[contains(@class,'group-hover:text-lc-icon-primary')]
    `) as Array<ElementHandle<Element>>

    return { previousLink, nextLink }
  }

  async function clickLink (link: ElementHandle<Element>) {
    const page = await getPage()

    // Need to hover first so it can fetch necessary data before clicking
    await link.hover()
    await waitUntil(async () => (
      await link.evaluate((link) => link.getAttribute('href'))
    ))
    const currentTitle = await page.evaluate(() => document.title)

    await link.click()
    await waitUntil(async () => (
      await page.evaluate(() => document.title) !== currentTitle
    ))
    await sleep(1000)
  }

  async function goToNextPage () {
    const { nextLink } = await getPreviousAndNextLink()
    await clickLink(nextLink)
  }

  async function goToPreviousPage () {
    const { previousLink } = await getPreviousAndNextLink()
    await clickLink(previousLink)
  }

  return {
    goToNextPage,
    goToPreviousPage,
  }
}
