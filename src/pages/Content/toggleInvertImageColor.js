const { INVERT_IMAGE_COLOR_CLASS_NAME } = require('../../constants')
const $body = document.querySelector('body')

const enable = () => $body.classList.add(INVERT_IMAGE_COLOR_CLASS_NAME)
const disable = () => $body.classList.remove(INVERT_IMAGE_COLOR_CLASS_NAME)

export const toggleInvertImageColor = (value) => (value ? enable : disable)()
