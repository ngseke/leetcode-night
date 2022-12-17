import { waitForElement } from './selector'

async function selectResetButton () {
  return await waitForElement(
    '[data-cy="code-area"] button[icon="return"]'
  ) as HTMLButtonElement
}

async function selectDialogConfirmButton () {
  return await waitForElement(
    '.ant-modal-body button:nth-child(2)'
  ) as HTMLButtonElement
}

export default async function resetCode () {
  const resetButton = await selectResetButton()
  resetButton.click()

  const confirmButton = await selectDialogConfirmButton()
  confirmButton.click()
}
