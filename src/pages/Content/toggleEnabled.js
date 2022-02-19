const { BODY_CLASS_NAME } = require('../../constants')
const $body = document.querySelector('body')

const enable = () => $body.classList.add(BODY_CLASS_NAME)
const disable = () => $body.classList.remove(BODY_CLASS_NAME)

export const toggleEnabled = (value) => (value ? enable : disable)()
