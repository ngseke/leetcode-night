import { type ElementHandle, type Browser, type Page } from 'puppeteer'

export function useYoutubeLink ({
  getBrowser,
  getPage,
  selectLinks,
  getPageQuestionTitle,
}: {
  getBrowser: () => Browser,
  getPage: () => Promise<Page>,
  selectLinks: () => Promise<Array<ElementHandle<Element>>>,
  getPageQuestionTitle: () => Promise<string>,
}) {
  async function assertLink () {
    const browser = getBrowser()
    const page = await getPage()

    // It should only render exact one YouTube link
    const links = await selectLinks()
    expect(links).toHaveLength(1)

    // Click the link and assert the opened tab
    await links[0].click()
    const target = await browser.waitForTarget(
      target => target.opener() === page.target()
    )
    const youtubePage = await target.page()
    const youtubePageUrl = youtubePage?.url()

    const title = await getPageQuestionTitle()
    expect(youtubePageUrl).toContain('https://www.youtube.com/results?search_query=')
    expect(youtubePageUrl).toContain(encodeURIComponent(title))

    await youtubePage?.close()
  }

  return {
    assertLink,
  }
}
