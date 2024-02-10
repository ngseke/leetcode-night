import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Options } from './Options'
import { mockChrome } from '../../../../__tests__/chrome'
import { TEST_IDS } from '../../../constants'

describe('Options', () => {
  test('should switch UI language', async () => {
    mockChrome()
    render(<Options />)

    function assertTitle (name: string) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }

    async function selectOption (name: string) {
      const select = screen.getByTestId(TEST_IDS.languageSelect)
      await userEvent.selectOptions(select, name)
    }

    assertTitle('Language')

    await selectOption('正體中文')
    assertTitle('語言')

    await selectOption('简体中文')
    assertTitle('语言')

    await selectOption('日本語')
    assertTitle('言語')

    await selectOption('한국어')
    assertTitle('언어')
  })
})
