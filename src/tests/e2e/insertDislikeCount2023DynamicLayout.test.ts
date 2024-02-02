import { type ElementHandle } from 'puppeteer'
import { useBrowserAndPages } from '../helpers/puppeteer'
import { useOptions } from '../helpers/useOptions'
import { usePagination2023 } from '../helpers/usePagination2023'
import { customDislikeTextDatasetValue, customLikeTextDatasetValue, datasetKey, likeTextDatasetValue } from '../../pages/Content/InsertDislikeCount'
import { waitFor } from '../helpers/waitFor'

describe('[2023 Dynamic Layout] Insert dislike count', () => {
  const optionLabel = 'Show Dislike Count'

  const { getPage, getPopupPage } =
    useBrowserAndPages({ leetcodeVersion: '2023-dynamic-layout' })

  const { toggleOptionSwitch } = useOptions({ getPopupPage })

  const { goToNextPage, goToPreviousPage } = usePagination2023({ getPage })

  async function selectElement (datasetValue: string) {
    const page = await getPage()
    const selector = `[data-${datasetKey}=${datasetValue}]`

    return await page.$(selector)
  }

  async function getCount (element: ElementHandle<Element>) {
    const rawText = await element?.evaluate((text) => text.textContent)
    if (!rawText) return null

    const count = +rawText.trim().replaceAll(',', '')
    return count
  }

  async function getLikeCount () {
    const element = await selectElement(customLikeTextDatasetValue)
    if (!element) return
    return await getCount(element)
  }

  async function getDislikeCount () {
    const element = await selectElement(customDislikeTextDatasetValue)
    if (!element) return
    return await getCount(element)
  }

  async function getIsOriginalLikeCountVisible () {
    const element = await selectElement(likeTextDatasetValue)
    return await element?.isVisible()
  }

  test('disable and enable insert dislike count', async () => {
    expect(await getIsOriginalLikeCountVisible()).toBe(false)
    expect(await getDislikeCount()).toBeGreaterThan(0)

    await toggleOptionSwitch(optionLabel, false)
    expect(await getIsOriginalLikeCountVisible()).toBe(true)
    expect(await getDislikeCount()).toBeFalsy()

    await toggleOptionSwitch(optionLabel, true)
    expect(await getIsOriginalLikeCountVisible()).toBe(false)
    expect(await getDislikeCount()).toBeGreaterThan(0)

    await toggleOptionSwitch(optionLabel, false)
    expect(await getIsOriginalLikeCountVisible()).toBe(true)
    expect(await getDislikeCount()).toBeFalsy()
  })

  test('update like and dislike count after navigation', async () => {
    await toggleOptionSwitch(optionLabel, true)

    const likeCount = await getLikeCount()
    const dislikeCount = await getDislikeCount()
    expect(likeCount).toBeGreaterThan(0)
    expect(dislikeCount).toBeGreaterThan(0)

    await goToNextPage()
    await waitFor(async () => (
      await getLikeCount() === likeCount &&
      await getDislikeCount() === dislikeCount
    ))

    const anotherLikeCount = await getLikeCount()
    const anotherDislikeCount = await getDislikeCount()
    expect(anotherLikeCount).toBeGreaterThan(0)
    expect(anotherDislikeCount).toBeGreaterThan(0)
    expect(anotherLikeCount).not.toBe(likeCount)
    expect(anotherDislikeCount).not.toBe(dislikeCount)

    await goToPreviousPage()
    await waitFor(async () => (
      await getLikeCount() === anotherLikeCount &&
      await getDislikeCount() === anotherDislikeCount
    ))

    expect(await getLikeCount()).not.toBe(anotherLikeCount)
    expect(await getDislikeCount()).not.toBe(anotherDislikeCount)
  })
})
