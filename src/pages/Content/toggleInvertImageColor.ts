import BodyClassToggler from './BodyClassToggler'
const { INVERT_IMAGE_COLOR_CLASS_NAME } = require('../../constants')

const bodyClassToggler = new BodyClassToggler(INVERT_IMAGE_COLOR_CLASS_NAME)

export const toggleInvertImageColor = (value: boolean) => bodyClassToggler.toggle(value)
