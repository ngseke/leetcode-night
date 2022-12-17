import { loadIsEnabled, loadOptions, loadIsAutoResetCodeEnabled } from '../../storage'

import { toggleEnabled } from './toggleEnabled'
import { toggleInvertImageColor } from './toggleInvertImageColor'
import { toggleInvertImageColor2023 } from './toggleInvertImageColor2023'
import { toggleEnabledMascot } from './toggleEnabledMascot'
import { toggleHideLogo } from './toggleHideLogo'
import { toggleHideLogo2023 } from './toggleHideLogo2023'

import { OptionsForm } from '../../options'
import { ENABLED_STORAGE_KEY, OPTIONS_STORAGE_KEY } from '../../constants'

import { resetCode } from './resetCode'
import { resetCode2023 } from './resetCode2023'
import { detectVersion } from './version'

async function toggleInvertImageColorByVersion (value: boolean) {
  const version = await detectVersion()
  if (version === 2023) {
    toggleInvertImageColor2023(value)
  } else if (version === 2022) {
    toggleInvertImageColor(value)
  }
}

async function toggleHideLogoByVersion (value: boolean) {
  const version = await detectVersion()
  if (version === 2023) {
    toggleHideLogo2023(value)
  } else if (version === 2022) {
    toggleHideLogo(value)
  }
}

const handleOptionsChange = (options: OptionsForm) => {
  toggleInvertImageColorByVersion(options?.invertImageColor ?? false)
  toggleEnabledMascot(options?.mascot ?? false)
  toggleHideLogoByVersion(options?.hideLogo ?? false)
}

async function resetCodeByVersion () {
  const version = await detectVersion()
  if (version === 2023) {
    resetCode2023()
  } else if (version === 2022) {
    resetCode()
  }
}

async function init () {
  toggleEnabled(await loadIsEnabled())
  handleOptionsChange(await loadOptions())

  if (await loadIsAutoResetCodeEnabled()) {
    resetCodeByVersion()
  }
}

init()

chrome.storage.onChanged.addListener((changes) => {
  const isEnabled = changes[ENABLED_STORAGE_KEY]?.newValue
  if (isEnabled != null) toggleEnabled(isEnabled)

  const options = changes[OPTIONS_STORAGE_KEY]?.newValue
  if (options != null) handleOptionsChange(options)
})
