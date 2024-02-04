import { useBrowserAndPages } from '../helpers/puppeteer'
import { useOptions } from '../helpers/useOptions'

describe('[2023 Dynamic Layout] Dark theme', () => {
  const optionLabel = 'Enable Dark Theme'

  const { getPage, getPopupPage } =
    useBrowserAndPages({ leetcodeVersion: '2023-dynamic-layout' })

  const { toggleOptionSwitch } = useOptions({ getPopupPage })

  async function getColorScheme () {
    const page = await getPage()
    const colorScheme = await page.evaluate(() => (
      document.documentElement.style.colorScheme
    ))
    return colorScheme
  }

  test('should toggle built-in dark theme', async () => {
    expect(await getColorScheme()).toBe('dark')

    await toggleOptionSwitch(optionLabel, false)
    expect(await getColorScheme()).toBe('light')

    await toggleOptionSwitch(optionLabel, true)
    expect(await getColorScheme()).toBe('dark')

    await toggleOptionSwitch(optionLabel, false)
    expect(await getColorScheme()).toBe('light')
  })
})
