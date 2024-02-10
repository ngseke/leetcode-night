import { render, screen, waitFor } from '@testing-library/react'
import { SearchQuestion } from './SearchQuestion'
import * as apis from '../modules/apis'
import { mockDailyChallengeQuestion } from '../../../tests/helpers/mockDailyChallengeQuestion'
import { TEST_IDS } from '../../../constants'
import { mockQuestions } from '../../../tests/helpers/mockQuestions'
import userEvent from '@testing-library/user-event'

describe('SearchQuestion', () => {
  vi.spyOn(apis, 'fetchDailyChallengeQuestion')
    .mockResolvedValue(mockDailyChallengeQuestion)
  vi.spyOn(apis, 'fetchQuestions')
    .mockResolvedValue(mockQuestions)

  function selectInput () {
    return screen.getByLabelText('Search by Question Number or Keyword')
  }

  async function typeInput (value: string) {
    await userEvent.type(selectInput(), value)
  }

  async function clearInput () {
    for (let i = 0; i < 10; i++) {
      await userEvent.type(selectInput(), '{backspace}')
    }
  }

  function selectResults () {
    return screen.getAllByTestId(TEST_IDS.questionCard)
  }

  test('should display daily question card', async () => {
    render(<SearchQuestion />)
    await waitFor(() => {})

    const card = screen.getByTestId(TEST_IDS.dailyChallengeQuestionCard)

    expect(card).toBeInTheDocument()
    expect(screen.getByText('Daily Challenge')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('2024-02-08')).toBeInTheDocument()
    expect(screen.getByText('53.9%')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: 'Daily Challenge Question' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://leetcode.com/problems/perfect-squares')
  })

  test('should display exactly matched result by question id', async () => {
    render(<SearchQuestion />)
    await waitFor(() => {})

    await typeInput('1')

    expect(selectResults()[0].textContent).contain('1.')
    expect(selectResults()[0].textContent).contain('Two Sum')

    await typeInput('0')
    expect(selectResults()[0].textContent).contain('10.')
    expect(selectResults()[0].textContent).contain('Regular Expression Matching')

    await typeInput('0')
    expect(selectResults()[0].textContent).contain('100.')
    expect(selectResults()[0].textContent).contain('Same Tree')

    await clearInput()

    await typeInput('69')
    expect(selectResults()[0].textContent).contain('69.')
    expect(selectResults()[0].textContent).contain('Sqrt(x)')
  })

  test('should display matched results by keywords', async () => {
    render(<SearchQuestion />)
    await waitFor(() => {})

    await typeInput('adDbInAry')
    expect(selectResults()[0].textContent).contain('67.')
    expect(selectResults()[0].textContent).contain('Add Binary')
    await clearInput()

    await typeInput('mws')
    expect(selectResults().length).toBeGreaterThan(1)
    expect(selectResults()[0].textContent).contain('76.')
    expect(selectResults()[0].textContent).contain('Minimum Window Substring')
  })

  test('should display no result message', async () => {
    render(<SearchQuestion />)
    await waitFor(() => {})

    await typeInput('99999')
    expect(screen.getByText('No Results Found')).toBeInTheDocument()
    await clearInput()

    await typeInput('zzzzzzzzzz')
    expect(screen.getByText('No Results Found')).toBeInTheDocument()
  })

  test('should open question page on pressing enter', async () => {
    render(<SearchQuestion />)
    await waitFor(() => {})

    const hiddenLink = screen.getByTestId(TEST_IDS.questionCardHiddenLink)
    const spyOnHiddenLinkClick = vi.spyOn(hiddenLink, 'click')

    await typeInput('{enter}')
    expect(hiddenLink.getAttribute('href'))
      .toBe('https://leetcode.com/problems/perfect-squares')
    expect(spyOnHiddenLinkClick).toBeCalledTimes(1)

    await typeInput('twosum')
    await typeInput('{enter}')
    expect(hiddenLink.getAttribute('href'))
      .toBe('https://leetcode.com/problems/two-sum')
    expect(spyOnHiddenLinkClick).toBeCalledTimes(2)
  })

  test('should select item by keyboard up/down key', async () => {
    render(<SearchQuestion />)
    await waitFor(() => {})

    await typeInput('substring')
    expect(selectResults().length).toBe(4)

    const hiddenLink = screen.getByTestId(TEST_IDS.questionCardHiddenLink)
    const spyOnHiddenLinkClick = vi.spyOn(hiddenLink, 'click')

    for (let i = 0; i <= 3; i++) {
      expect(selectResults()[i].className).contain('is-active')
      await typeInput('{arrowdown}')
    }

    expect(selectResults()[0].className).contain('is-active')

    for (let i = 3; i >= 0; i--) {
      await typeInput('{arrowup}')
      expect(selectResults()[i].className).contain('is-active')
    }

    await typeInput('{enter}')
    expect(hiddenLink.getAttribute('href'))
      .toBe('https://leetcode.com/problems/minimum-window-substring')
    expect(spyOnHiddenLinkClick).toBeCalledTimes(1)
  })
})
