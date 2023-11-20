import { type QuestionStatus } from './Question'

type UserStatus = 'NotStart' | 'Finish'

export interface DailyChallengeQuestion {
  date: string,
  question: {
    acRate: number,
    difficulty: 'Easy' | 'Medium' | 'Hard',
    freqBar: null,
    frontendQuestionId: string,
    isFavor: boolean,
    status: QuestionStatus,
    title: string,
    titleSlug: string,
  },
  userStatus: UserStatus,
}
