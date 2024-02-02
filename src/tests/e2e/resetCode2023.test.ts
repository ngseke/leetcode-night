import { useBrowserAndPages } from '../helpers/puppeteer'
import { useOptions } from '../helpers/useOptions'
import { useResetCode } from '../helpers/useResetCode'

describe('[2023 Dynamic Layout] Reset code', () => {
  const { getPage, getPopupPage } = useBrowserAndPages({
    leetcodeVersion: '2023',
  })

  const { toggleOptionSwitch } = useOptions({ getPopupPage })

  const { assertResetCode } = useResetCode({ getPage, toggleOptionSwitch })

  test('should reset code when entering the page', async () => {
    await assertResetCode()
  })
})
