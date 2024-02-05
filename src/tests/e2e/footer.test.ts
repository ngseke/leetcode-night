import { useBrowserAndPages } from '../helpers/puppeteer'

describe('Footer', () => {
  const { getBrowser, getPopupPage } =
    useBrowserAndPages({ leetcodeVersion: '2023-dynamic-layout' })

  test('links in footer should be valid', async () => {
    const browser = getBrowser()
    const popupPage = await getPopupPage()

    const footer = await popupPage.waitForSelector('footer')
    const links = await footer?.$$('a') ?? []

    expect(links.length).toBeGreaterThan(0)

    for (const link of links) {
      expect(await link.evaluate((link) => link.getAttribute('target')))
        .toBe('_blank')

      const url = await link.evaluate((link) => link.getAttribute('href'))
      expect(url).toBeTruthy()

      const newPage = await browser.newPage()
      const response = await newPage.goto(url ?? '')
      expect(response?.status()).toBe(200)

      await newPage.close()
    }
  })
})
