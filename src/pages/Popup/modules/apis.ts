import axios from 'axios'
import Question, { QuestionMap } from '../types/Question'

export async function fetchQuestions () {
  const { data } = await axios.get<{ stat_status_pairs: Question[]}>(
    'https://leetcode.com/api/problems/algorithms/'
  )

  return data?.stat_status_pairs.reduce<QuestionMap>((questions, item) => {
    questions[item.stat.frontend_question_id] = item
    return questions
  }, {})
}
