import { TEST_IDS } from '../../constants'
import { useBrowserAndPages } from '../helpers/puppeteer'

describe('Daily Challenge', () => {
  const { getBrowser, getPopupPage } =
    useBrowserAndPages({ leetcodeVersion: '2023-dynamic-layout' })

  test('should render the card', async () => {
    const browser = getBrowser()
    const popupPage = await getPopupPage()

    const card = await popupPage.waitForSelector(
      `[data-testid=${TEST_IDS.dailyChallengeQuestionCard}]`
    )

    const textContent = await card?.evaluate((card) => card.textContent)
    expect(textContent).toMatch(/\d{4}-\d{2}-\d{2}/)
    expect(textContent).toMatch(/\d{1,5}\. (.+)/)
    expect(textContent).toMatch(/Easy|Medium|Hard/)

    const link = await card?.$('a')
    await link?.click()
    const target = await browser.waitForTarget(
      target => target.opener() === popupPage.target()
    )
    const questionPage = await target.page()
    const questionPageUrl = questionPage?.url()

    expect(questionPageUrl).toMatch(/https:\/\/leetcode.com\/problems\/(.+)/)
  })
})
