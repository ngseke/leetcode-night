export interface Stat {
  frontend_question_id: number,
  is_new_question: boolean,
  question__hide: boolean,
  question__title: string,
  question__title_slug: string,
  question_id: number,
  total_acs: number,
  total_submitted: number,
}

export interface Difficulty {
  level: 1 | 2 | 3,
}

export type QuestionStatus = null | 'ac' | 'notac'

export interface RawQuestion {
  difficulty: Difficulty,
  frequency: number,
  paid_only: boolean,
  progress: number,
  stat: Stat,
  status: QuestionStatus,
}

export interface Question extends RawQuestion {
  title: string,
  url: string,
}

export type QuestionMap = Record<number, Question>
