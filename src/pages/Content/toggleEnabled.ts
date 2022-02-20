import BodyClassToggler from './BodyClassToggler'
import { CLASS_NAMES } from '../../constants'

const bodyClassToggler = new BodyClassToggler(CLASS_NAMES.BODY)

export const toggleEnabled = (value: boolean) => bodyClassToggler.toggle(value)
