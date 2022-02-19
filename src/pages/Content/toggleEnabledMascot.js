const { MASCOT_CLASS_NAME } = require('../../constants')
console.log(MASCOT_CLASS_NAME);
const $body = document.querySelector('body')

const enable = () => $body.classList.add(MASCOT_CLASS_NAME)
const disable = () => $body.classList.remove(MASCOT_CLASS_NAME)

export const toggleEnabledMascot = (value) => (value ? enable : disable)()
