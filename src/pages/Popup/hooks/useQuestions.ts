import { useMemo } from 'react'
import useSWR from 'swr'
import Question, { Questions } from '../types/Question'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function useQuestions (keyword: string) {
  const { data } = useSWR<{ stat_status_pairs: Question[] }>(
    'https://leetcode.com/api/problems/algorithms/',
    fetcher
  )
  const questions = useMemo(() => {
    return data?.stat_status_pairs.reduce<Questions>((questions, item) => {
      questions[item.stat.frontend_question_id] = item
      return questions
    }, {})
  }, [data])

  const isLoadingQuestions = !questions

  const matchedQuestion = useMemo(() => {
    return questions?.[+keyword]
  }, [keyword, questions])

  const matchedQuestionUrl = useMemo(() => {
    if (!matchedQuestion) return null
    return `https://leetcode.com/problems/${matchedQuestion.stat.question__title_slug}`
  }, [matchedQuestion])

  return {
    questions,
    isLoadingQuestions,
    matchedQuestion,
    matchedQuestionUrl,
  }
}
