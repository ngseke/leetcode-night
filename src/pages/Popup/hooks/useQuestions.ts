import { useEffect, useMemo, useState } from 'react'
import Question, { Questions } from '../types/Question'

export default function useQuestions (keyword: string) {
  const [questions, setQuestions] = useState<Questions>()

  const isLoadingQuestions = !questions

  useEffect(() => {
    fetch('https://leetcode.com/api/problems/algorithms/')
      .then(res => res.json())
      .then((data) => {
        setQuestions(
          (data.stat_status_pairs as Question[])
            .reduce<Questions>((questions, item) => {
            questions[item.stat.frontend_question_id] = item
            return questions
          }, {})
        )
      })
  }, [])

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
