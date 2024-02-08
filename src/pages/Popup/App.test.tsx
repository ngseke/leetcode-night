import { render, screen } from '@testing-library/react'
import { App } from './App'
import { mockChrome } from '../../../__tests__/chrome'
import { TEST_IDS } from '../../constants'
import userEvent from '@testing-library/user-event'
import * as useEnableDarkThemeHooks from './hooks/useEnableDarkTheme'

describe('Popup app', () => {
  vi.spyOn(useEnableDarkThemeHooks, 'useEnableDarkTheme')
    .mockReturnValue([true, vi.fn()])

  async function clickQuestionsTabButton () {
    await userEvent.click(
      screen.getByTestId(TEST_IDS.questionsTabButton)
    )
  }

  async function clickOptionsTabButton () {
    await userEvent.click(
      screen.getByTestId(TEST_IDS.optionsTabButton)
    )
  }

  test('should switch to selected tab', async () => {
    mockChrome()
    render(<App />)

    await clickOptionsTabButton()
    expect(screen.getByTestId(TEST_IDS.optionsTab))

    await clickQuestionsTabButton()
    expect(screen.getByTestId(TEST_IDS.questionsTab))

    await clickOptionsTabButton()
    expect(screen.getByTestId(TEST_IDS.optionsTab))

    expect(console.error).toBeCalledTimes(0)
    expect(console.warn).toBeCalledTimes(0)
  })

  test('should remember the previously selected tab', async () => {
    mockChrome()
    const { rerender } = render(<App />)

    await clickOptionsTabButton()
    rerender(<App />)
    expect(screen.getByTestId(TEST_IDS.optionsTab))

    await clickQuestionsTabButton()
    rerender(<App />)
    expect(screen.getByTestId(TEST_IDS.questionsTab))
  })
})
