import axios from 'axios'
import { request, gql } from 'graphql-request'
import { type DailyChallengeQuestion } from '../types/DailyChallengeQuestion'
import { type Question, type RawQuestion } from '../types/Question'

export function getQuestionUrl (titleSlug: string) {
  return `https://leetcode.com/problems/${titleSlug}`
}

export async function fetchQuestions () {
  const { data } = await axios.get<{ stat_status_pairs: RawQuestion[] }>(
    'https://leetcode.com/api/problems/all/'
  )

  const extendedQuestions =
    data?.stat_status_pairs.map<Question>(question => ({
      ...question,
      title: question.stat.question__title,
      url: getQuestionUrl(question.stat.question__title_slug),
    }))

  return extendedQuestions as readonly Question[]
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
