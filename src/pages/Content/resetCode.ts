import waitForElement from './waitForElement'

export default async function resetCode () {
  const $reset = await waitForElement(
    '[data-cy="code-area"] button[icon="return"]'
  ) as HTMLButtonElement
  $reset.click()

  const $confirm = await waitForElement(
    '.ant-modal-body button:nth-child(2)'
  ) as HTMLButtonElement
  $confirm.click()
}
