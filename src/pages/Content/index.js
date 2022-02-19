import { loadIsEnabled, loadOptions } from '../../storage'
import './style/problem.sass'
import { toggleEnabled } from './toggleEnabled'
import { toggleInvertImageColor } from './toggleInvertImageColor'

const { ENABLED_STORAGE_KEY, OPTIONS_STORAGE_KEY } = require('../../constants')

const handleOptionsChange = (options) => {
  toggleInvertImageColor(options?.invertImageColor ?? false)
}

async function init() {
  toggleEnabled(await loadIsEnabled())
  handleOptionsChange(await loadOptions())
}

init()

chrome.storage.onChanged.addListener((changes, namespace) => {
  const isEnabled = changes[ENABLED_STORAGE_KEY]?.newValue
  if (isEnabled != null) toggleEnabled(isEnabled)

  const options = changes[OPTIONS_STORAGE_KEY]?.newValue
  if (options != null) handleOptionsChange(options)
})
