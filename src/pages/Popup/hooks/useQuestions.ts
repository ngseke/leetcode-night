import { useCallback, useEffect, useMemo } from 'react'
import useStorageState from 'react-use-storage-state'
import Question, { Questions } from '../types/Question'

export default function useQuestions (keyword: string) {
  const [questions, setQuestions] = useStorageState<Questions | null>('questions', null)

  const fetchQuestions = useCallback(async () => {
    const res = await fetch('https://leetcode.com/api/problems/algorithms/')
    const data = await res.json()
    setQuestions(
      (data?.stat_status_pairs as Question[]).reduce<Questions>((questions, item) => {
        questions[item.stat.frontend_question_id] = item
        return questions
      }, {})
    )
  }, [setQuestions])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const isLoadingQuestions = !questions

  const matchedQuestion = useMemo(() => {
    return questions?.[parseInt(keyword)]
  }, [keyword, questions])

  const matchedQuestionUrl = useMemo(() => {
    if (!matchedQuestion) return null
    return `https://leetcode.com/problems/${matchedQuestion.stat.question__title_slug}`
  }, [matchedQuestion])

  const isNotMatched = Boolean(keyword && questions && !matchedQuestion)

  return {
    questions,
    isLoadingQuestions,
    matchedQuestion,
    matchedQuestionUrl,
    isNotMatched,
  }
}
