import { useCallback, useEffect, useMemo } from 'react'
import { useStorageState } from 'react-use-storage-state'
import DailyChallengeQuestion from '../types/DailyChallengeQuestion'

export default function useDailyChallengeQuestion () {
  const [dailyChallengeQuestion, setDailyChallengeQuestion] =
    useStorageState<DailyChallengeQuestion | null>('dailyChallenge', null)

  const fetchDailyChallengeQuestion = useCallback(async () => {
    const res = await fetch('https://leetcode.com/graphql/', {
      headers: { 'content-type': 'application/json' },
      body: '{"query":"\\n    query questionOfToday {\\n  activeDailyCodingChallengeQuestion {\\n    date\\n    userStatus\\n    link\\n    question {\\n      acRate\\n      difficulty\\n      freqBar\\n      frontendQuestionId: questionFrontendId\\n      isFavor\\n      paidOnly: isPaidOnly\\n      status\\n      title\\n      titleSlug\\n      hasVideoSolution\\n      hasSolution\\n      topicTags {\\n        name\\n        id\\n        slug\\n      }\\n    }\\n  }\\n}\\n    ","variables":{}}',
      method: 'POST',
    })
    const { data } = await res.json()
    setDailyChallengeQuestion(
      data.activeDailyCodingChallengeQuestion as DailyChallengeQuestion
    )
  }, [setDailyChallengeQuestion])

  useEffect(() => {
    fetchDailyChallengeQuestion()
  }, [fetchDailyChallengeQuestion])

  const dailyChallengeQuestionUrl = useMemo(() => {
    if (!dailyChallengeQuestion) return null
    return `https://leetcode.com/problems/${dailyChallengeQuestion.question.titleSlug}`
  }, [dailyChallengeQuestion])

  return {
    dailyChallengeQuestion,
    dailyChallengeQuestionUrl,
  }
}
