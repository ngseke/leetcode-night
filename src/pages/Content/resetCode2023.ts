import { waitForElementsByXpath } from './selector'

async function selectResetButton () {
  const resetIconPath = 'M5.725 9.255h2.843a1 1 0 110 2H3.2a1 1 0 01-1-1V4.887a1 1 0 012 0v3.056l2.445-2.297a9.053 9.053 0 11-2.142 9.415 1 1 0 011.886-.665 7.053 7.053 0 1010.064-8.515 7.063 7.063 0 00-8.417 1.202L5.725 9.255z'

  const dynamicLayoutResetIconPath = 'M40 224c-13.3 0-24-10.7-24-24V56c0-13.3 10.7-24 24-24s24 10.7 24 24v80.1l20-23.5C125 63.4 186.9 32 256 32c123.7 0 224 100.3 224 224s-100.3 224-224 224c-50.4 0-97-16.7-134.4-44.8c-10.6-8-12.7-23-4.8-33.6s23-12.7 33.6-4.8C179.8 418.9 216.3 432 256 432c97.2 0 176-78.8 176-176s-78.8-176-176-176c-54.3 0-102.9 24.6-135.2 63.4l-.1 .2 0 0L93.1 176H184c13.3 0 24 10.7 24 24s-10.7 24-24 24H40z'

  const [button] = await waitForElementsByXpath(`
    //*[@id="editor"]
    //button[
      .//*[
        @d="${resetIconPath}" or
        @d="${dynamicLayoutResetIconPath}"
      ]
    ]`
  )

  return button as HTMLButtonElement
}

async function selectDialogConfirmButton () {
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
