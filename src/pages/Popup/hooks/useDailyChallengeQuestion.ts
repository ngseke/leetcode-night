import { useEffect, useMemo } from 'react'
import { useStorageState } from 'react-use-storage-state'
import { fetchDailyChallengeQuestion } from '../modules/apis'
import DailyChallengeQuestion from '../types/DailyChallengeQuestion'

export default function useDailyChallengeQuestion () {
  const [dailyChallengeQuestion, setDailyChallengeQuestion] =
    useStorageState<DailyChallengeQuestion | null>('dailyChallenge', null)

  useEffect(() => {
    fetchDailyChallengeQuestion().then(setDailyChallengeQuestion)
  }, [setDailyChallengeQuestion])

  const dailyChallengeQuestionUrl = useMemo(() => {
    if (!dailyChallengeQuestion) return null
    return `https://leetcode.com/problems/${dailyChallengeQuestion.question.titleSlug}`
  }, [dailyChallengeQuestion])

  return {
    dailyChallengeQuestion,
    dailyChallengeQuestionUrl,
  }
}
