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

export default interface Question {
  difficulty: Difficulty,
  frequency: number,
  paid_only: boolean,
  progress: number,
  stat: Stat,
  status: null | 'ac' | 'notac',
}

export type Questions = Record<number, Question>
