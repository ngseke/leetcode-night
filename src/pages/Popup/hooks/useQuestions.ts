import { useEffect, useMemo } from 'react'
import useStorageState from 'react-use-storage-state'
import { fetchQuestions } from '../modules/apis'
import { QuestionMap } from '../types/Question'

export default function useQuestions (keyword: string) {
  const [questions, setQuestions] = useStorageState<QuestionMap | null>('questions', null)

  useEffect(() => {
    fetchQuestions().then(setQuestions)
  }, [setQuestions])

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
