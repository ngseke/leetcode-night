import { loadIsEnabled, loadOptions, loadIsAutoResetCodeEnabled, saveIsEnabled, loadIsInsertYoutubeLinkEnabled, saveLeetcodeVersion, loadIsInsertDislikeCountEnabled } from '../../storage'

import { toggleEnabled } from './toggleEnabled'
import { toggleInvertImageColor } from './toggleInvertImageColor'
import { toggleInvertImageColor2023 } from './toggleInvertImageColor2023'
import { toggleEnabledMascot } from './toggleEnabledMascot'
import { toggleHideLogo } from './toggleHideLogo'
import { toggleHideLogo2023 } from './toggleHideLogo2023'

import { type OptionsForm } from '../../options'
import { resetCode } from './resetCode'
import { resetCode2023 } from './resetCode2023'
import { detectLeetcodeVersion } from './leetcode-version'
import { onChangeIsDarkSide2023, setIsDarkSide2023 } from './darkSide2023'
import { startInsertYoutubeLinkObserver, stopInsertYoutubeLinkObserver } from './InsertYoutubeLink'
import { startInsertDislikeCountObserver, stopInsertDislikeCountObserver } from './InsertDislikeCount'

async function toggleInvertImageColorByVersion (value: boolean) {
  const version = await detectLeetcodeVersion()
  if (version === '2022') {
    toggleInvertImageColor(value)
  } else {
    toggleInvertImageColor2023(value)
  }
}

async function toggleHideLogoByVersion (value: boolean) {
  const version = await detectLeetcodeVersion()
  if (version === '2022') {
    toggleHideLogo(value)
  } else {
    toggleHideLogo2023(value)
  }
}

const handleOptionsChange = (options: OptionsForm) => {
  toggleInvertImageColorByVersion(options?.invertImageColor ?? false)
  toggleEnabledMascot(options?.mascot ?? false)
  toggleHideLogoByVersion(options?.hideLogo ?? false)
}

async function toggleEnabledByVersion (value: boolean) {
  const version = await detectLeetcodeVersion()
  if (version === '2022') {
    toggleEnabled(value)
  } else {
    setIsDarkSide2023(value)
  }
}

async function resetCodeByVersion () {
  const version = await detectLeetcodeVersion()
  if (version === '2022') {
    resetCode()
  } else {
    resetCode2023()
  }
}

async function startOrStopInsertYoutubeLinkObserver () {
  const isInsertYoutubeLinkEnabled = await loadIsInsertYoutubeLinkEnabled()

  if (isInsertYoutubeLinkEnabled) startInsertYoutubeLinkObserver()
  else stopInsertYoutubeLinkObserver()
}

async function startOrStopInsertDislikeCountObserver () {
  const isEnabled = await loadIsInsertDislikeCountEnabled()

  if (isEnabled) startInsertDislikeCountObserver()
  else stopInsertDislikeCountObserver()
}

async function init () {
  chrome.storage.onChanged.addListener(async () => {
    toggleEnabledByVersion(await loadIsEnabled())
    handleOptionsChange(await loadOptions())
    startOrStopInsertYoutubeLinkObserver()
    startOrStopInsertDislikeCountObserver()
  })

  toggleEnabledByVersion(await loadIsEnabled())
  onChangeIsDarkSide2023(saveIsEnabled)

  handleOptionsChange(await loadOptions())

  if (await loadIsAutoResetCodeEnabled()) {
    resetCodeByVersion()
  }
  startOrStopInsertYoutubeLinkObserver()
  startOrStopInsertDislikeCountObserver()
  saveLeetcodeVersion(await detectLeetcodeVersion())
}

init()
