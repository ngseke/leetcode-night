import { render, screen, waitFor } from '@testing-library/react'
import { SearchQuestion } from './SearchQuestion'
import * as apis from '../modules/apis'
import { mockDailyChallengeQuestion } from '../../../tests/helpers/mockDailyChallengeQuestion'
import { TEST_IDS } from '../../../constants'

describe('SearchQuestion', () => {
  vi.spyOn(apis, 'fetchDailyChallengeQuestion')
    .mockResolvedValue(mockDailyChallengeQuestion)

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
})
