import puppeteer, { type Page, type Browser } from 'puppeteer'
import { EXTENSION_ID } from '../../constants'
import { type LeetcodeVersion } from '../../pages/Content/leetcode-version'

const extensionPath = 'dist'

export async function createBrowser () {
  const browser = await puppeteer.launch({
    headless: 'new',
    // headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
    ],
  })

  return browser
}

export async function createPage (
  browser: Browser,
  { leetcodeVersion }: {
    leetcodeVersion: LeetcodeVersion,
  }
) {
  const slug = 'two-sum'
  const url = `https://leetcode.com/problems/${slug}/description/`

  const page = await browser.newPage()
  await page.setViewport({ width: 1400, height: 900 })
  await page.goto(url)
  await page.evaluate(function skipGuide () {
    localStorage.setItem('dynamicIdeLayoutGuide', 'true')
  })
  if (leetcodeVersion === '2023') {
    await page.evaluate(() => {
      localStorage.setItem('dynamic-layout-disabled', 'true')
    })
  }

  await page.reload({ waitUntil: 'networkidle2' })

  return page
}

export async function createPopupPage (browser: Browser) {
  const url = `chrome-extension://${EXTENSION_ID}/src/pages/Popup/popup.html`

  const page = await browser.newPage()
  await page.setViewport({ width: 1400, height: 900 })
  await page.goto(url)
  await page.waitForNetworkIdle()

  return page
}

export function useBrowserAndPages ({ leetcodeVersion }: {
  leetcodeVersion: LeetcodeVersion,
}) {
  let browser: Browser | undefined
  let page: Page | undefined
  let popupPage: Page | undefined

  beforeEach(async () => {
    browser = await createBrowser()
  })

  afterEach(async () => {
    await browser?.close()

    browser = undefined
    page = undefined
    popupPage = undefined
  })

  /** Return the same `browser` in each test */
  function getBrowser () {
    if (!browser) throw new Error()
    return browser
  }

  /** Return the same `page` in each test */
  async function getPage () {
    if (!browser) throw new Error()
    if (!page) {
      page = await createPage(browser, { leetcodeVersion })
    }
    await page.bringToFront()
    return page
  }

  async function getPageQuestionTitle () {
    const page = await getPage()
    const headTitle = await page.evaluate(() => document.title)
    const questionTitle = headTitle.replaceAll(' - LeetCode', '').trim()

    return questionTitle
  }

  /** Return the same `popupPage` in each test */
  async function getPopupPage () {
    if (!browser) throw new Error()
    if (!popupPage) {
      popupPage = await createPopupPage(browser)
    }
    await popupPage.bringToFront()
    return popupPage
  }

  return {
    getBrowser,
    getPage,
    getPageQuestionTitle,
    getPopupPage,
  }
}
