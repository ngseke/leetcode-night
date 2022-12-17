import { waitForElement } from './selector'

export default async function getQuestionNumber () {
  const selector = '[data-cy="question-title"]'
  const $el = await waitForElement(selector) as HTMLDivElement
  const number = parseInt($el.childNodes[0].textContent ?? '')

  return number
}
