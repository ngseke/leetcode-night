import { useEffect } from 'react'
import { useStorageState } from 'react-use-storage-state'
import { fetchDailyChallengeQuestion } from '../modules/apis'
import { type DailyChallengeQuestion } from '../types/DailyChallengeQuestion'

export function useDailyChallengeQuestion () {
  const [dailyChallengeQuestion, setDailyChallengeQuestion] =
    useStorageState<DailyChallengeQuestion | null>('dailyChallenge', null)

  useEffect(() => {
    fetchDailyChallengeQuestion().then(setDailyChallengeQuestion)
  }, [setDailyChallengeQuestion])

  const dailyChallengeQuestionUrl = dailyChallengeQuestion
    ? `https://leetcode.com/problems/${dailyChallengeQuestion.question.titleSlug}`
    : null

  return {
    dailyChallengeQuestion,
    dailyChallengeQuestionUrl,
  }
}
