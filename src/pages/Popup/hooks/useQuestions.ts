import { useEffect, useMemo } from 'react'
import useStorageState from 'react-use-storage-state'
import { fetchQuestions } from '../modules/apis'
import { type Question, type QuestionMap } from '../types/Question'
import fuzzysort from 'fuzzysort'

export function useQuestions (keyword: string) {
  const [questions, setQuestions] =
    useStorageState<Question[] | null>('questions', null)

  const questionMap = useMemo(() => {
    const map: QuestionMap = {}

    // HACK: keeping this array check for backward compatibility
    if (!Array.isArray(questions)) return null

    questions.forEach((question) => {
      map[question.stat.frontend_question_id] = question
    })

    return map
  }, [questions])

  useEffect(() => {
    fetchQuestions().then(setQuestions)
  }, [setQuestions])

  const isLoadingQuestions = !questions

  const matchedQuestionById = questionMap?.[Number(keyword)]

  const matchedQuestionResultsByKeyword = useMemo(() => {
    if (!questions) return null
    const results = fuzzysort.go(keyword, questions, {
      key: 'title',
      limit: 20,
    })

    return results
  }, [keyword, questions])

  const isNotFound = Boolean(
    keyword &&
    questions &&
    !matchedQuestionById &&
    !matchedQuestionResultsByKeyword?.length
  )

  return {
    questions,
    isLoadingQuestions,
    matchedQuestionById,
    matchedQuestionResultsByKeyword,
    isNotFound,
  }
}
