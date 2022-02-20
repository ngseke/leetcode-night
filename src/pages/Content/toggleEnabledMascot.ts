import BodyClassToggler from './BodyClassToggler'
const { MASCOT_CLASS_NAME } = require('../../constants')

const bodyClassToggler = new BodyClassToggler(MASCOT_CLASS_NAME)

export const toggleEnabledMascot = (value: boolean) => bodyClassToggler.toggle(value)
