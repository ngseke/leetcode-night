import BodyClassToggler from './BodyClassToggler'
const { BODY_CLASS_NAME } = require('../../constants')

const bodyClassToggler = new BodyClassToggler(BODY_CLASS_NAME)

export const toggleEnabled = (value: boolean) => bodyClassToggler.toggle(value)
