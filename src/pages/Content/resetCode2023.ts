import { waitForElementsByXpath } from './selector'

export async function selectResetButton () {
  const resetIconPath = 'M5.725 9.255h2.843a1 1 0 110 2H3.2a1 1 0 01-1-1V4.887a1 1 0 012 0v3.056l2.445-2.297a9.053 9.053 0 11-2.142 9.415 1 1 0 011.886-.665 7.053 7.053 0 1010.064-8.515 7.063 7.063 0 00-8.417 1.202L5.725 9.255z'

  const [button] = await waitForElementsByXpath(`
    //*[@id="editor"]
    //button[
      .//*[@d="${resetIconPath}"]
    ]`
  )
  return button as HTMLButtonElement
}

export async function selectDialogConfirmButton () {
  const message = 'Your current code will be discarded and reset to the default code!'
  const [button] = await waitForElementsByXpath(`
    //*[@role="dialog" and contains(., "${message}")]
    //button[contains(., "Confirm")]`
  )

  return button as HTMLButtonElement
}

const sleep = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export async function resetCode2023 () {
  const resetButton = await selectResetButton()
  resetButton.click()

  await sleep()
  const confirmButton = await selectDialogConfirmButton()
  confirmButton.click()
}
