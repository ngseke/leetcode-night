import { getIsEnabled } from '../../storage'
import './style/problem.sass'

const { BODY_CLASS_NAME, ENABLED_STORAGE_KEY } = require('../../constants')

const $body = document.querySelector('body')

const enable = () => $body.classList.add(BODY_CLASS_NAME)
const disable = () => $body.classList.remove(BODY_CLASS_NAME)
const toggle = (value) => (value ? enable : disable)()

async function init() {
  toggle(await getIsEnabled())
}

init()

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace !== 'sync') return
  toggle(changes[ENABLED_STORAGE_KEY].newValue)
})
