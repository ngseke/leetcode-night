import { useBrowserAndPages } from '../helpers/puppeteer'
import { useOptions } from '../helpers/useOptions'
import { useYoutubeLink } from '../helpers/useYoutubeLink'
import { usePagination2023 } from '../helpers/usePagination2023'

describe('[2023 Dynamic Layout] Insert YouTube Link', () => {
  const optionLabel = 'Show YouTube Link Shortcut'

  const { getBrowser, getPage, getPageQuestionTitle, getPopupPage } =
    useBrowserAndPages({ leetcodeVersion: '2023-dynamic-layout' })

  const { toggleOptionSwitch } = useOptions({ getPopupPage })

  const { assertLink } = useYoutubeLink({
    getBrowser,
    getPage,
    selectLinks,
    getPageQuestionTitle,
  })

  const { goToNextPage, goToPreviousPage } = usePagination2023({ getPage })

  async function selectLinks () {
    const page = await getPage()

    const metaList = await page.waitForXPath(`//div[
      @class="flex gap-1" and
      //*[text()[contains(., 'Easy')]]
    ]`)

    if (!metaList) throw new Error('Failed to select meta list')

    const links = await metaList.$$(`xpath/a[
      contains(@href, 'youtube.com') and
      contains(., 'YouTube')
    ]`)

    return links
  }

  test('disable and enable insert YouTube link', async () => {
    expect(await selectLinks()).toHaveLength(1)

    await toggleOptionSwitch(optionLabel, false)
    expect(await selectLinks()).toHaveLength(0)

    await toggleOptionSwitch(optionLabel, true)
    expect(await selectLinks()).toHaveLength(1)

    await toggleOptionSwitch(optionLabel, false)
    expect(await selectLinks()).toHaveLength(0)
  })

  test('insert YouTube link after navigation', async () => {
    await toggleOptionSwitch(optionLabel, true)
    await assertLink()

    await goToNextPage()
    await assertLink()

    await goToPreviousPage()
    await assertLink()
  })
})
