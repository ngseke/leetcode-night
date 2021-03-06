import { loadIsEnabled, loadOptions, loadIsAutoResetCodeEnabled } from '../../storage'

import { toggleEnabled } from './toggleEnabled'
import { toggleInvertImageColor } from './toggleInvertImageColor'
import { toggleEnabledMascot } from './toggleEnabledMascot'
import { toggleHideLogo } from './toggleHideLogo'

import { OptionsForm } from '../../options'
import { ENABLED_STORAGE_KEY, OPTIONS_STORAGE_KEY } from '../../constants'

import resetCode from './resetCode'

const handleOptionsChange = (options: OptionsForm) => {
  toggleInvertImageColor(options?.invertImageColor ?? false)
  toggleEnabledMascot(options?.mascot ?? false)
  toggleHideLogo(options?.hideLogo ?? false)
}

async function init () {
  toggleEnabled(await loadIsEnabled())
  handleOptionsChange(await loadOptions())
  if (await loadIsAutoResetCodeEnabled()) resetCode()
}

init()

chrome.storage.onChanged.addListener((changes) => {
  const isEnabled = changes[ENABLED_STORAGE_KEY]?.newValue
  if (isEnabled != null) toggleEnabled(isEnabled)

  const options = changes[OPTIONS_STORAGE_KEY]?.newValue
  if (options != null) handleOptionsChange(options)
})
