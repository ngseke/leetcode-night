import { QuestionStatus } from './Question'

type UserStatus = 'NotStart' | 'Finish'

export default interface DailyChallengeQuestion {
  date: string,
  link: string,
  question: {
    acRate: number,
    difficulty: 'Easy' | 'Medium' | 'Hard',
    freqBar: null,
    frontendQuestionId: string,
    hasSolution: boolean,
    hasVideoSolution: boolean,
    isFavor: boolean,
    paidOnly: boolean,
    status: QuestionStatus,
    title: string,
    titleSlug: string,
    topicTags: unknown[],
  },
  userStatus: UserStatus,
}
