import { loadIsEnabled, loadOptions, loadIsAutoResetCodeEnabled, saveIsEnabled, loadIsInsertYoutubeLinkEnabled, saveLeetcodeVersion, loadIsInsertDislikeCountEnabled } from '../../storage'

import { toggleEnabled } from './toggleEnabled'
import { toggleInvertImageColor } from './toggleInvertImageColor'
import { toggleInvertImageColor2023 } from './toggleInvertImageColor2023'
import { toggleEnabledMascot } from './toggleEnabledMascot'
import { toggleHideLogo } from './toggleHideLogo'
import { toggleHideLogo2023 } from './toggleHideLogo2023'

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

async function applyOptions () {
  const options = await loadOptions()
  toggleInvertImageColorByVersion(options?.invertImageColor ?? false)
  toggleEnabledMascot(options?.mascot ?? false)
  toggleHideLogoByVersion(options?.hideLogo ?? false)
}

async function toggleEnabledByVersion () {
  const isEnabled = await loadIsEnabled()
  const version = await detectLeetcodeVersion()

  if (version === '2022') {
    toggleEnabled(isEnabled)
  } else {
    setIsDarkSide2023(isEnabled)
  }
}

async function tryResetCodeByVersion () {
  const isEnabled = await loadIsAutoResetCodeEnabled()
  if (!isEnabled) return

  const version = await detectLeetcodeVersion()
  if (version === '2022') {
    resetCode()
  } else {
    resetCode2023()
  }
}

async function startOrStopInsertYoutubeLinkObserver () {
  const isEnabled = await loadIsInsertYoutubeLinkEnabled()

  if (isEnabled) startInsertYoutubeLinkObserver()
  else stopInsertYoutubeLinkObserver()
}

async function startOrStopInsertDislikeCountObserver () {
  const isEnabled = await loadIsInsertDislikeCountEnabled()

  if (isEnabled) startInsertDislikeCountObserver()
  else stopInsertDislikeCountObserver()
}

async function init () {
  async function startOrStopTasks () {
    toggleEnabledByVersion()
    applyOptions()
    startOrStopInsertYoutubeLinkObserver()
    startOrStopInsertDislikeCountObserver()
  }

  chrome.storage.onChanged.addListener(startOrStopTasks)
  startOrStopTasks()

  tryResetCodeByVersion()
  onChangeIsDarkSide2023(saveIsEnabled)
  saveLeetcodeVersion(await detectLeetcodeVersion())
}

init()
