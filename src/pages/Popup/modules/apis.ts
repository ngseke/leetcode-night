import axios from 'axios'
import { request, gql } from 'graphql-request'
import DailyChallengeQuestion from '../types/DailyChallengeQuestion'
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

export async function fetchDailyChallengeQuestion () {
  const query = gql`
    query questionOfToday {
      activeDailyCodingChallengeQuestion {
        date
        userStatus
        question {
          acRate
          difficulty
          freqBar
          frontendQuestionId: questionFrontendId
          isFavor
          status
          title
          titleSlug
        }
      }
    }
  `
  const data = await request('https://leetcode.com/graphql/', query)
  return data.activeDailyCodingChallengeQuestion as DailyChallengeQuestion
}
